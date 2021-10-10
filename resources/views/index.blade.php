<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="csrf-token" content="{{ csrf_token()}}" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />

    <title>Ticle</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    
    <div id="root" class="has-background-grey-light"></div>

    <script defer>
      const imgUrl = `{{ asset('images') }}`
      const baseUrl = `{{url('/')}}`
    </script>
    <script src="{{ asset('js/app.js') }}" defer></script>
  </body>
</html>
