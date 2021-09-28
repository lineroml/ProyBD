import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,300;1,400&display=swap'
            rel='stylesheet'
          />
          <script src='https://kit.fontawesome.com/433667d0d8.js' crossOrigin='anonymous' />
          <script defer src='/your-path-to-fontawesome/js/brands.js'></script>
          <script defer src='/your-path-to-fontawesome/js/solid.js'></script>
          <script defer src='/your-path-to-fontawesome/js/fontawesome.js'></script>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
        </Head>
        <body className='bg-gray-100 font-roboto'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
