import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Vacation Manager App",
  description: "Vacation Manager App - A simple vacation manager app built with ReactJs and Nextjs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Create a client

  return (
    <html lang="en">
      <body className="relative bg-yellow-50 overflow-hidden max-h-screen">
    
              {children}
        
        </body>
    </html>
  );
}
