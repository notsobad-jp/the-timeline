import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang='ja'>
        <Head />
        <body className="text-sm">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
