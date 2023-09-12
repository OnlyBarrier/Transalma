"use client";

import Link from "next/link";

export default function BottomBar() {

    return (
        <div className="mt-64 grid text-center lg:max-w-xs lg:w-full lg:mb-10 lg:grid-cols-1 lg:text-left">
            <Link
                href="/createInvoice"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
               
                rel="noopener noreferrer"
            >
                <h2 className={`mb-6 text-xl font-semibold`}>
                    Crear factura{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Crea nuevas facturas llenando un formulario.
                </p>
            </Link>

            <Link
                href="/getInvoice"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
               
                rel="noopener noreferrer"
            >
                <h2 className={`mb-6 text-xl font-semibold`}>
                    Ver facturas{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Encuentra facturas basado en algunos parametros.
                </p>
            </Link>
            <Link
                href="/createEntries"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
               
                rel="noopener noreferrer"
            >
                <h2 className={`mb-6 text-xl font-semibold`}>
                    Crear entrada{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Crea nuevas entradas llenando un formulario.
                </p>
            </Link>
        </div>
    )

}