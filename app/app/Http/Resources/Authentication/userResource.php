<?php

namespace App\Http\Resources\Authentication;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class userResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'job' => $this->job,
            'department' => $this->department,
            'email' => $this->email,
            'status' => $this->status,
            'created_at' => dateCheck($this->created_at, true),
            'deleted_at' => $this->deleted_at,
        ];
    }
}