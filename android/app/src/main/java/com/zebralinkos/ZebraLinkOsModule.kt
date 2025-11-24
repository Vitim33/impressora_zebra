package com.zebralinkos

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import com.facebook.react.bridge.*
import com.zebra.sdk.comm.BluetoothConnection
import com.zebra.sdk.printer.ZebraPrinterFactory
import com.zebra.sdk.printer.ZebraPrinter
import com.zebra.sdk.printer.PrinterLanguage
import java.io.IOException

class ZebraLinkOsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "ZebraLinkOs"

    /**
     * Retorna dispositivos pareados (bonded)
     * Promise.resolve(Array<{name: string, address: string}>)
     */
    @ReactMethod
    fun getPairedDevices(promise: Promise) {
        try {
            val adapter = BluetoothAdapter.getDefaultAdapter()
                ?: return promise.reject("NO_ADAPTER", "Bluetooth não suportado")

            if (!adapter.isEnabled) {
                return promise.reject("DISABLED", "Bluetooth está desligado")
            }

            val list = Arguments.createArray()
            val paired: Set<BluetoothDevice> = adapter.bondedDevices
            for (device in paired) {
                val m = Arguments.createMap()
                m.putString("name", device.name ?: "Unknown")
                m.putString("address", device.address)
                list.pushMap(m)
            }
            promise.resolve(list)
        } catch (e: Exception) {
            promise.reject("ERROR_PAIRED", e.message)
        }
    }

    /**
     * Tenta imprimir ZPL em uma impressora Bluetooth pelo MAC (address)
     * Promise.resolve("OK") ou Promise.reject("PRINT_ERROR", message)
     */
    @ReactMethod
    fun printZPL(address: String, zpl: String, promise: Promise) {
        Thread {
            var connection: BluetoothConnection? = null
            try {
                connection = BluetoothConnection(address)
                connection.open() // abre a conexão RFCOMM

                val printer: ZebraPrinter = ZebraPrinterFactory.getInstance(connection)
                // Apenas para diagnóstico, mas não necessário enviar
                val language = printer.printerControlLanguage

                connection.write(zpl.toByteArray(Charsets.UTF_8))
                connection.close()

                promise.resolve("OK")
            } catch (e: Exception) {
                try { connection?.close() } catch (_: Exception) {}
                promise.reject("PRINT_ERROR", e.message ?: "Erro desconhecido ao imprimir")
            }
        }.start()
    }

    /**
     * Conecta e retorna basic info (ex.: modelo) - útil para diagnóstico
     * Promise.resolve({ model: string, language: string }) ou reject
     */
    @ReactMethod
    fun connectAndInfo(address: String, promise: Promise) {
        Thread {
            var connection: BluetoothConnection? = null
            try {
                connection = BluetoothConnection(address)
                connection.open()

                val printer: ZebraPrinter = ZebraPrinterFactory.getInstance(connection)
                val language: PrinterLanguage? = printer.printerControlLanguage

                // Modelo: fallback seguro, compatível com todas versões
                val model: String = try {
                    // Algumas versões da Zebra SDK não possuem 'model', então usamos "unknown"
                    printer.javaClass.getMethod("getModel")?.invoke(printer) as? String ?: "unknown"
                } catch (_: Exception) {
                    "unknown"
                }

                val map = Arguments.createMap()
                map.putString("model", model)
                map.putString("language", language?.name ?: "UNKNOWN")

                connection.close()
                promise.resolve(map)
            } catch (e: Exception) {
                try { connection?.close() } catch (_: Exception) {}
                promise.reject("CONNECT_ERROR", e.message ?: "Erro desconhecido ao conectar")
            }
        }.start()
    }
}
