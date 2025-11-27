package com.zebralinkos

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import com.facebook.react.bridge.*
import com.zebra.sdk.comm.BluetoothConnection
import com.zebra.sdk.printer.PrinterLanguage
import com.zebra.sdk.printer.ZebraPrinter
import com.zebra.sdk.printer.ZebraPrinterFactory

class ZebraLinkOsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "ZebraLinkOs"

    @ReactMethod
    fun getPairedDevices(promise: Promise) {
        try {
            val adapter = BluetoothAdapter.getDefaultAdapter()
                ?: return promise.reject("NO_ADAPTER", "Bluetooth não suportado")

            if (!adapter.isEnabled) {
                return promise.reject("DISABLED", "Bluetooth está desligado")
            }

            val list = Arguments.createArray()

            adapter.bondedDevices.forEach { device ->
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

    @ReactMethod
    fun printZPL(address: String, zpl: String, promise: Promise) {
        Thread {
            var connection: BluetoothConnection? = null
            try {
                connection = BluetoothConnection(address)
                connection.open()       // faz pareamento se necessário

                connection.write(zpl.toByteArray(Charsets.UTF_8))

                connection.close()
                promise.resolve("OK")

            } catch (e: Exception) {
                try { connection?.close() } catch (_: Exception) {}
                promise.reject("PRINT_ERROR", e.message ?: "Erro ao imprimir")
            }
        }.start()
    }

    @ReactMethod
    fun connectAndInfo(address: String, promise: Promise) {
        Thread {
            var connection: BluetoothConnection? = null
            try {
                connection = BluetoothConnection(address)
                connection.open()

                val printer: ZebraPrinter = ZebraPrinterFactory.getInstance(connection)
                val language: PrinterLanguage? = printer.printerControlLanguage

                val model: String =
                    try {
                        printer.javaClass.getMethod("getModel")
                            ?.invoke(printer) as? String ?: "unknown"
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
                promise.reject("CONNECT_ERROR", e.message ?: "Erro ao conectar")
            }
        }.start()
    }
}
