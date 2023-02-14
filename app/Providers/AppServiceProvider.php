<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {   
        Validator::extend('is_date', function ($attribute, $value, $parameters, $validator) {
            $this->start = Carbon::parse($parameters[0])->addMinute(1);
            // dd($this->start);
            $this->startEnd = $parameters[0];
            $this->docid = $parameters[2];
            $this->usluga_time = Str::of($parameters[1]) ->explode('~');
            $this->end = Carbon::parse($this->startEnd)->addMinutes($this->usluga_time[1])->subMinute(1);
            // dd($this->end);
            $count = DB::table('event_clients')
            // ->where('start', '=', $value)
                // ->where('start', '=', $parametrs[0])->count();
                ->orWhere(function ($q) {
                    $q->where('start', '>=', $this->start)
                        ->where('start', '<=', $this->end)
                        ->where('doctor_id', '=', $this->docid);
                })
                ->orWhere(function ($q) {
                    $q->where('end', '>=', $this->start)
                        ->where('end', '<=', $this->end)
                        ->where('doctor_id', '=', $this->docid);
                })
                ->orWhere(function ($q) {
                    $q->where('start', '<', $this->start)
                        ->where('end', '>', $this->end)
                        ->where('doctor_id', '=', $this->docid);
                })
                ->count();
                // dd($count);
            return $count === 0;
        });
    }
}
