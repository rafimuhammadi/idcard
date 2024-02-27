<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Auth\UserLanguage;
use App\Models\LoginInfo;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;
use Jenssegers\Agent\Agent;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function username()
    {
        return 'username';
    }

    protected function sendLoginResponse(Request $request)
    {
        $userLang = UserLanguage::where('user_id', uid())->first();
        if ($userLang)
            Session::put('locale', $userLang->language);
        else
            Session::put('locale', Config::get('app.locale'));

        // Access the user's browser type
        $browser = $request->userAgent();
        // Create an instance of the Agent class
        $agent = new Agent();
        // Set the user agent string
        $agent->setUserAgent($browser);
        // Get the browser type
        $browserType = $agent->browser();
        // user device
        $userAgent = $_SERVER['HTTP_USER_AGENT'];
        $device = '';
        if (strpos($userAgent, 'Mobile') !== false) {
            $device = 'Mobile';
        } elseif (strpos($userAgent, 'Tablet') !== false) {
            $device = 'Tablet';
        } else {
            $device = 'Desktop';
        }

        function getOperatingSystem()
        {
            $userAgent = $_SERVER['HTTP_USER_AGENT'];
            $osPlatforms = [
                'Windows' => 'Windows',
                'iPhone' => 'iOS',
                'iPad' => 'iOS',
                'Macintosh' => 'Mac',
                'Android' => 'Android',
                'Linux' => 'Linux',
                'Linux' => 'Linux',
            ];
            foreach ($osPlatforms as $platform => $os) {
                if (strpos($userAgent, $platform) !== false)
                    return $os;
            }
            return 'Unknown';
        }

        $store = new LoginInfo();
        $store->user_id = uid();
        $store->ip_address = $_SERVER['REMOTE_ADDR'];
        $store->browser = $browserType;
        $store->device = $device;
        $store->operating_system = getOperatingSystem();
        $store->operating_system_username = get_current_user();
        $store->login_time = Carbon::now()->toTimeString();
        $store->save();

        Session::put('user_session_id', $store->id);
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        if ($response = $this->authenticated($request, $this->guard()->user())) {
            return $response;
        }

        return $request->wantsJson()
            ? new JsonResponse([], 204)
            : redirect()->intended($this->redirectPath());
    }

    public function logout(Request $request)
    {
        $update = LoginInfo::find(session()->get('user_session_id'));
        if ($update) {
            $update->logout_time = Carbon::now()->toTimeString();
            $update->update();
            $this->guard()->logout();
        }
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        if ($response = $this->loggedOut($request)) {
            return $response;
        }
        return $request->wantsJson()
            ? new JsonResponse([], 204)
            : redirect('/');
    }
}
