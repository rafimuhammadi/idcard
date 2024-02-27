<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\session;
use Illuminate\Support\Facades\Input;
use App\models\aut\Lang;
use App\models\Auth\UserLanguage;

class LanguageController extends Controller
{

    /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
      $this->middleware('auth');
  }
  
  /**
   * @desc To change the current language.
   *
   * @request Ajax.
   */
  public function changeLanguage(Request $request)
  {
    Session::put('locale', $request->locale);
    $userid = Auth::id();
    //Check if user has a default language
    $def_lang = UserLanguage::where('user_id',$userid)->get();
    if(count($def_lang)>0)
    {
      $data = array(
        'language'    => $request->locale
      );
      UserLanguage::where('user_id',$userid)->update($data);
    }
    else
    {
      $data = array(
        'user_id'      => $userid,
        'language'    => $request->locale
      );
      UserLanguage::insert($data);
    }
    $lang = $request->locale;
    return Redirect()->back();
  }
    
}