<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobNoteIndexRequest extends FormRequest
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
            'search' => ['nullable', 'string'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'sort' => ['nullable', 'in:created_at,reminder_at'],
            'direction' => ['nullable', 'in:asc,desc'],
            'has_reminder' => ['nullable', 'boolean'],
        ];
    }
}
