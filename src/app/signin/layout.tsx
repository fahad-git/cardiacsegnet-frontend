"use client";

import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // redirect to home if already logged in

    }, []);

    return (
        <div className="col-md-6 m-auto">
            {children}
        </div>
    );
}

export { Layout };