<!doctype html>
<html lang="en">

<head>
    <title>{{ trans('words.Login Page') }}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="{{ asset('login-style.css') }}">
    <link rel="shortcut icon" href="{{ asset('logo.png') }}" type="image/x-icon">
    <link href="{!! asset('assets/font/font.css') !!}" rel="stylesheet" type="text/css" />
    <style>
        * {
            font-family: B Nazanin;
        }

        body {
            position: relative;
            width: 100%;
            height: 100vh;
            background-color: #fafafa
            background-size: cover;
            background-position: center;
        }
    </style>
</head>

<body>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-start">
                <div class="col-md-6 col-lg-6">
                    <div class="d-flex justify-content-center">
                        <div class="w-100 text-center">
                            <div style="background-color:rgba(17, 47, 122,0.5);padding:5px; border-radius:10px">
                                <h4 class="m-login__title"
                                    style="color:#fff;font-size:1.8rem;font-weight:270; font-family:B Nazanin;">
                                   Our system just responed to authenticated API Requests!
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>

</html>
