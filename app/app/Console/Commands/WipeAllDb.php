<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class WipeAllDb extends Command
{
    protected $signature = 'db-wipe';

    protected $description = 'Command description';

    public function handle()
    {
        Artisan::call('db:wipe');
        Artisan::call('db:wipe --database=lookup_db');
        Artisan::call('db:wipe --database=weapon_sys_db');
        Artisan::call('db:wipe --database=armor_vehicle_db');
        Artisan::call('db:wipe --database=security_company_db');
        Artisan::call('migrate:fresh --seed');
        $this->info('Successfully Wiped');
    }
}
