<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobStoreRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'job_status_id' => ['required', 'integer', 'exists:job_statuses,id'],
            'applied_at' => ['nullable', 'date'],
            'posting_url' => ['nullable', 'url', 'max:2048'],
            'salary' => ['nullable', 'string', 'max:255'],
        ];
    }
}
