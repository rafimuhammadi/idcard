<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait PermissionBasedTrait
{
    protected static function bootPermissionBasedTrait()
    {
        static::addGlobalScope('PermissionBasedTrait', function (Builder $builder) {
            $builder->when(!auth()->user()->can('all-view'), function ($builder) {
                return $builder->where($builder->qualifyColumn('created_directorate'), directorateId());
            });
            $builder->when(auth()->user()->can('view'), function ($builder) {
                return $builder->where($builder->qualifyColumn('created_by'), userid());
            });
            $builder->when(auth()->user()->can('department-view'), function ($builder) {
                return $builder->where($builder->qualifyColumn('created_sub_department'), subDepartmentId());
            });
            $builder->when(auth()->user()->can('department-all-view'), function ($builder) {
                return $builder->where($builder->qualifyColumn('created_department'), departmentId());
            });
        });
    }
}