<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'company' => ['sometimes', 'string', 'max:255'],
            'location' => ['sometimes', 'nullable', 'string', 'max:255'],
            'job_status_id' => ['sometimes', 'integer', 'exists:job_statuses,id'],
            'applied_at' => ['sometimes', 'nullable', 'date'],
            'posting_url' => ['sometimes', 'nullable', 'url', 'max:2048'],
            'salary' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
