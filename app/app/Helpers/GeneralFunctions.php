<?php

use App\Models\ACU\Area;
use App\Models\ACU\AreasDepartment;
use App\Models\ACU\Fugitive\EventType;
use App\Models\ACU\Gozar;
use App\Models\ACU\Home;
use App\Models\ACU\HomeStories;
use App\Models\ACU\Language;
use App\Models\Auth\Department;
use App\Models\Auth\Directorates;
use App\Models\Auth\SubDepartment;
use App\Models\Auth\System;
use App\Models\Auth\UserLanguage;
use App\Models\Auth\UserSystem;
use App\models\Districts;
use App\models\Provinces;
use App\models\ACU\Zone;
use App\models\ACU\Shared;
use Illuminate\Support\Str;
use App\Models\ACU\Religion;
use App\Models\ACU\Ethnicity;
use Hekmatinasser\Verta\Verta;
use Carbon\Carbon;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Hekmatinasser\Jalali\Jalali;

function userid()
{
    return Auth::user()->id;
}
function get_language()
{
    $locale = App::getLocale();
    //echo $locale;exit;
    $def_lang = UserLanguage::select('*')->where('user_id', userid())->get();
    //echo "<pre>"; print_r($def_lang);exit;
    if (COUNT($def_lang) > 0) {
        foreach ($def_lang as $item) {
            $lang = $item->language;
        }
        session()->put('locale', $lang);
    } else {
        $locale = App::getLocale();
        session()->put('locale', $locale);
    }
    return Session()->get('locale');
}
function encode_id($id)
{
    return base64_encode(Str::random(30) . '-' . base64_encode($id));
}

function decode_id($id)
{
    $x = base64_decode($id);
    $x = explode('-', $x)[1];
    return base64_decode($x);
}

function to_gregorian($date)
{
    return \Morilog\Jalali\Jalalian::fromFormat('Y-m-d', $date)->toCarbon();
}

function to_jalali($date)
{
    return \Morilog\Jalali\CalendarUtils::strftime('Y-m-d h:i:s', strtotime($date));
}

function uid()
{
    return auth()->user()->id;
}

function dep_id()
{
    return auth()->user()->department_id;
}

function hasAccessToSystem($system_id)
{
    $user_system = UserSystem::where('user_id', auth()->user()->id)->where('system_id', $system_id)->select('user_id', 'system_id')->first();
    return $user_system == null ? false : true;
}

function currentYear()
{
    return \Morilog\Jalali\CalendarUtils::strftime('Y', strtotime(date('Y')));
}

function can($can)
{
    return auth()->user()->can($can);
}

function get_locale()
{
    return session()->get('locale');
}

function weapon_card_id($date, $id)
{
    return 'WC-' . \Morilog\Jalali\CalendarUtils::strftime('Y', strtotime($date)) . str_pad($id, 7, '0', STR_PAD_LEFT);
}

function cur_date()
{
    return \Morilog\Jalali\Jalalian::forge('today')->format('Y');
}

function av_card_id($date, $id)
{
    return 'AV-' . \Morilog\Jalali\CalendarUtils::strftime('Y', strtotime($date)) . str_pad($id, 7, '0', STR_PAD_LEFT);
}

function day_name($date)
{
    $date = new DateTime($date);
    return trans('words.' . $date->format('l'));
}

function get_allProvinces()
{
    $data = Provinces::select('id as value', 'name_dr as label')->get();
    return $data;
}
function get_all_events()
{
    $data = EventType::select('id', 'name')->get();
    return $data;
}
function get_directorate()
{
    $data = Directorates::select('id', 'name_da as name')->get();
    return $data;
}
function get_department_by_directorate($id = 0)
{
    $data = Department::select('id', 'name_da as name', 'directorate_id')->where('directorate_id', $id)->get();
    return $data;
}
function get_sub_department_by_department_id($id = 0)
{
    $data = SubDepartment::select('id', 'name_da as name', 'department_id')->where('department_id', $id)->get();
    return $data;
}
function get_all_systems()
{
    $data = System::select('id as value', 'system_name as label')->get();
    return $data;
}
function get_role_by_system_id($id = 0)
{
    $data = Role::select('id', 'name', 'system_id')->where('system_id', $id)->get();
    return $data;
}
function BringDistricts($id)
{
    return Districts::select('id', 'name_dr' . ' as name')->where('province_id', $id)->get();
}
function bringZone($id)
{
    return Zone::select('id', 'name')->where('district_id', $id)->get();
}
function bringShared($id)
{
    return Shared::select('id', 'name')->where('zone_id', $id)->get();
}
function bringGozars($id)
{
    return Gozar::select('id', 'name')->where('shared_id', $id)->get();
}


function getPermissionsBySystemId($id)
{
    return Permission::select('id', 'name_dr as name', 'system_id')->where('system_id', $id)->get();
}
function bringAreas($id)
{
    return Area::select('id', 'area_information as name', 'gozar_id')->where('gozar_id', $id)->get();
}
function bringHome($id)
{
    return Home::select('id', 'home_number', 'home_type', 'apartment_type', 'apartment_number', 'block_number', 'zina_and_manzel_number')
        ->where('area_id', $id)->get();
}
function bringRolesBySystemId($id)
{
    return Role::select('id as value', 'name as label')->whereIn('system_id', $id)->get();
}

function directorateId()
{
    return Auth::user()->directorate_id;
}
function departmentId()
{
    return Auth::user()->department_id;
}
function subDepartmentId()
{
    return Auth::user()->sub_department_id;
}
function locationId()
{
    return Auth::user()->location_id;
}
function get_religions()
{
    return Religion::select('id', 'religion_name as name')->get();
}
function get_ethnicities()
{
    return Ethnicity::select('id', 'name')->get();
}
function get_languages()
{
    return Language::select('id', 'name')->get();
}

function dateConvert($date = '')
{
    //echo $date;exit;
    $lang = get_language();
    //$date = "1399-07-01";
    if ($date != "" and $lang != "en") {
        $date_exp = explode("-", $date);
        $ver_date = Verta::jalaliToGregorian($date_exp[0], $date_exp[1], $date_exp[2]);
        $imp_date = implode("-", $ver_date);
        return Carbon::parse($imp_date)->format('Y-m-d');
    } else {
        return $date;
    }
}

function dateCheck($date = "", $status = false)
{
    if ($date != "" && $date != "0000-00-00") {
        $jalaliDate = Verta::instance($date);
        $monthName = $jalaliDate->format('F');
        if ($status) {
            return $jalaliDate->format('d') . ' - ' . $monthName . ' - ' . $jalaliDate->format('Y') . ' - ' . $jalaliDate->format('h:i:s');
        } else {
            return $jalaliDate->format('d') . ' - ' . $monthName . ' - ' . $jalaliDate->format('Y');
            ;
        }
    }
}

function convertDate($date)
{
    return \Morilog\Jalali\CalendarUtils::strftime('Y-m-d', strtotime($date));
}

function getProvinceNameById($id)
{
    $records = Provinces::find($id);
    return strtoupper(substr($records->name_en, 0, 3));
}

function yearCheck($date = "", $lang = "dr")
{
    $lang = get_language();
    //$date = "1399-07-01";
    if ($date != "" and $lang != "en") {
        $date_exp = explode("-", $date);
        $ver_date = Verta::jalaliToGregorian($date_exp[0], $date_exp[1], $date_exp[2]);
        $imp_date = implode("-", $ver_date);
        return Carbon::parse($imp_date)->format('Y');
    } else {
        return $date;
    }
}

function home_record_information($id)
{
    return HomeStories::join('provinces', 'provinces.id', 'home_stories.province_id')
        ->join('districts', 'districts.id', 'home_stories.district_id')
        ->join('zones', 'zones.id', 'home_stories.zone_id')
        ->join('shareds', 'shareds.id', 'home_stories.shared_id')
        ->join('gozars', 'gozars.id', 'home_stories.gozar_id')
        ->join('areas', 'areas.id', 'home_stories.area_id')
        ->join('homes', 'homes.id', 'home_stories.home_id')
        ->select(
            'areas.area_information',
            'homes.main_lane_number',
            'homes.sub_lane_number',
            'homes.home_type',
            'homes.apartment_type',
            'homes.apartment_number',
            'homes.block_number',
            'homes.zina_and_manzel_number',
            'homes.home_number',
            'homes.gps_longitude',
            'homes.gps_latitude',
            'homes.track_point',
            'zones.name as zone',
            'provinces.name_dr as province',
            'districts.name_dr as district',
            'shareds.name as sharedName',
            'gozars.name as gozarName',
        )
        ->where('home_stories.head_of_home_id', $id)
        ->where('home_stories.status', 'موجود در خانه')
        ->first();
}

function user_system()
{
    return System::LeftJoin('user_systems', 'user_systems.system_id', 'systems.id')
        ->select(
            'systems.id',
            'systems.name_da',
            'systems.icon',
            'systems.route',
        )
        ->where('user_systems.user_id', userid())
        ->get();


}


function get_permissions($id = 0)
{
    return DB::table('role_has_permissions')->join('permissions', 'permissions.id', 'role_has_permissions.permission_id')
        ->where('role_has_permissions.role_id', $id)
        ->pluck('permissions.name_dr');
}
function buildTree(array $data, $parentId = null)
{
    $tree = [];
    foreach ($data as $item) {
        if ($item['parentId'] === $parentId) {
            $children = buildTree($data, $item['id']);

            if ($children) {
                $item['items'] = $children;
            }

            $tree[] = $item;
        }
    }

    return $tree;
}

function flattenHierarchyAreas($data, $parentId = null)
{
    $result = [];

    foreach ($data as $item) {
        $flatItem = [
            'id' => isset($item['id']) ? (string) $item['id'] : null,
            'label' => $item['label'],
            'parentId' => $parentId,
            'order_type' => $item['order_type'],
        ];

        if (isset($item['items']) && is_array($item['items']) && count($item['items']) > 0) {
            $nestedItems = flattenHierarchyAreas($item['items'], $flatItem['id']);
            $result = array_merge($result, $nestedItems);
        }

        $result[] = $flatItem;
    }

    return $result;
}
function flattenHierarchy($data, $parentId = null)
{
    $result = [];

    foreach ($data as $item) {
        $flatItem = [
            'id' => isset($item['id']) ? (string) $item['id'] : null,
            'label' => $item['label'],
            'parentId' => $parentId,
        ];

        if (isset($item['items']) && is_array($item['items']) && count($item['items']) > 0) {
            $nestedItems = flattenHierarchy($item['items'], $flatItem['id']);
            $result = array_merge($result, $nestedItems);
        }

        $result[] = $flatItem;
    }

    return $result;
}

if (!function_exists('departmentHierarchies')) {
    function departmentHierarchies($id)
    {
        $hierarchies = [];

        $record = AreasDepartment::find($id);

        while ($record) {
            $hierarchies[] = $record;
            $record = AreasDepartment::find($record->parent_id);
        }

        return array_reverse($hierarchies); // Reverse the array if you want it in descending order
    }
}