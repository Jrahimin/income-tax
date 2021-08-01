<?php


namespace App\Http\Traits;

trait ApiResponseTrait
{
    public function exceptionResponse(string $exception, int $code=500)
    {
        return response()->json([
            'code'      =>  $code,
            'message'  =>  $exception,
            'data'      =>  null
        ], 200);
    }

    /**
     * Invalid Request Response / Custom Validation Response
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function invalidResponse(string $message, int $code=422)
    {
        return response()->json([
            'code'      =>  $code,
            'message'  =>  $message,
            'data'      =>  null
        ], 200);
    }

    public function successResponse(string $message, $data)
    {
        return response()->json([
            'code'      =>  200,
            'message'  =>  $message,
            'data'      =>  $data
        ], 200);
    }

    public function respondWithAccessToken($accessToken)
    {
        return response()->json([
            'code'      =>  200,
            'message'  =>  "Access token generation success",
            'data'      =>  $accessToken
        ], 200);
    }

    public function unauthorizedResponse(string $message, $token)
    {
        return response()->json([
            'code'      =>  401,
            'message'  =>  $message,
            'data'      =>  $token
        ], 200);
    }
}
