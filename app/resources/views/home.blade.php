@extends('layouts.master')
@section('content')
    <style>
        a {
            color: #000000;
            background: none;
            text-decoration: none;
        }

        a :hover {
            cursor: pointer;
            color: #153a81;
            text-decoration: none;
        }

        .card {
            box-shadow: 0 0 10px #ccc;
            transition: transform .3s ease;
        }

        .content {
            padding: unset !important;
        }

        div .card:hover {
            color: #000000;
            border-radius: 5px;
            box-shadow: 0 0 15px #153a81;
            -webkit-transform: scale(1.05);
        }
    </style>
    <div class="row">
        @foreach ($systems as $item)
            @if (hasAccessToSystem($item->id))
                <div class="col-sm-12 col-md-4 col-lg-3 mb-5">
                    <div class="card h-100 bg-hover-gray-100">
                        <a href="{{ route($item->route) }}" class="text-dark">
                            <div class="card-body p-9">
                                <div class="d-flex justify-content-around">
                                    <div class="fs-2hx font-weight-bolder font-size-h1 ">{{ $item->name }}</div>
                                    <div>
                                        <img src="{{ asset($item->icon) }}" alt=""
                                            style="max-width: 50px !important;">
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            @endif
        @endforeach
    </div>
@endsection
