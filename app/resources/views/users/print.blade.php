<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Print Card</title>
    <style>
        @import url(https://fonts.googleapis.com/css?family=Lato:400,300,700);

            $orange: #fcb034;
            $blue: #00aeef;

            html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            direction: rtl;
            }

            body {
            font-family: 'Lato';
            direction: rtl;

            }

            .card {
            width: 250px;
            min-height: 300px;
            margin: 25px auto;
            padding: 15px 0;
            background: #fff;
            box-shadow: 0px 1px 2px rgba(0, 0, 0, .5);
            h3 {
                color: $orange;
                text-align: center;
                text-transform: uppercase;
            }
            ul {
                list-style-type: none;
                color: $blue;
                ul { padding: 0; }
                span { color: $orange; }
                a {
                color: $blue;
                text-decoration: none;
                &:hover { 
                    color: $orange;
                    text-decoration: none;
                }
                }
            }
            
            }
            .ring {
            position: relative;
            width: 165px;
            height: 165px;
            margin: 0 auto;
           
            border-radius: 50%;
            text-align: center;
            &:after {
                position: absolute;
                top: -5px;
                bottom: -5px;
                left: -5px;
                right: -5px;
                background: linear-gradient(to bottom, $orange 0%, $orange 50%, $blue 50%, $blue 100%);
                border-radius: 50%;
                content: ' ';
            }
            img {
                position: absolute;
                top: calc(50% - 80px);
                left: calc(50% - 80px);
                width: 150px;
                height: 150px;
                border: 5px solid white;
                border-radius: 50%;
                box-shadow: 0 0 5px white;
                z-index: 1;
            }
            }
    </style>
</head>

<body>
    <div class="card">
        <div class="ring">
          <img src="{{ asset('storage/' . $user->image) }}" />
        </div>
        
        <h3>{{$user->name}}</h3>
        
        <ul>
          <li><span  style="font-size: 16px;  font-weight: bold">وظیفه: </span>{{$user->job}}</li>
          <li><span  style="font-size: 16px;  font-weight: bold">مدیریت: </span>{{$user->department}}</li>
          <li><span  style="font-size: 16px;  font-weight: bold">ایمیل: </span>{{$user->email}}</li>
          <li>
            <img class="frontBarcodeContent" src="data:image/png;base64,{{ DNS2D::getBarcodePNG($user->username, 'PDF417', 10, 2) }}" height="45" width="180" alt="barcode" />
          </li>
        </ul>
        
      </div>
      <div class='frontBarcode'>
    </div>
   
</body>

</html>
