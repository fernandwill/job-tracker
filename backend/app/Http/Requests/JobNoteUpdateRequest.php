<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobNoteUpdateRequest extends FormRequest
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
            'body' => ['sometimes', 'string'],
            'reminder_at' => ['sometimes', 'nullable', 'date'],
            'created_by' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
        ];
    }
}
