<?php

namespace App\Traits;

use App\Models\Accounting\PC\PcExpenseSetup;
use App\Models\Accounting\PC\PcTranspoSetup;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use App\Models\Accounting\RFP\RfpMain;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\General\Attachments;
use App\Models\HumanResource\ITF\ItfDetail;
use App\Models\HumanResource\LAF\LafMain;
use Illuminate\Support\Facades\Log;

trait ApiResponser
{
    private function successResponse($data, $code){
        return response()->json($data, $code);
    }

    protected function errorResponse($message, $code){
        return response()->json(['error' => $message, 'code' => $code], $code);
    }

    protected function getGuid(){
        mt_srand((double)microtime()*10000);
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);
        $GUID = '';
        $GUID = chr(123)
            .substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12)
            .chr(125);
        $GUID = trim($GUID, '{');
        $GUID = trim($GUID, '}');
        return $GUID;

    }

    protected function getMainRef($type){
        if($type == "SURF") {
            $ref = DB::select("SELECT IFNULL((SELECT MAX(SUBSTR(a.`requisition_no`,11)) FROM procurement.`requisition_main` a WHERE YEAR(tstamp) = YEAR(NOW()) AND a.`trans_type` = '".$type."' ), FALSE) +1 AS 'ref'");
        }
        else {
            $ref = DB::select("SELECT IFNULL((SELECT MAX(SUBSTR(a.`requisition_no`,10)) FROM procurement.`requisition_main` a WHERE YEAR(tstamp) = YEAR(NOW()) AND a.`trans_type` = '".$type."' ), FALSE) +1 AS 'ref'");
        }
        $ref = $ref[0]->ref;
        $ref = str_pad($ref, 4, "0", STR_PAD_LEFT);
        $ref = $type."/" . date('Y') . "/" . $ref;

        return $ref;
    }
    
    protected function getRfpRef($companyId){
        // $now = Carbon::now();
        // $data = RfpMain::whereYear('TS',$now->year)->get('REQREF');
        // foreach($data as $entries){
        //     $entries->REQREF = substr($entries->REQREF, 9);
        // }
        // $maxData = $data->max();
        // $rfpRef = $maxData['REQREF'];
        // $rfpRef = $rfpRef+1;

        // $length = 4;
        // $string = $rfpRef;
        // $rfpRef = str_pad($string,$length,"0", STR_PAD_LEFT);
        
        // return 'RFP'.'-'.$now->year.'-'.$rfpRef;

        $dataREQREF = DB::select("SELECT IFNULL((SELECT MAX(SUBSTRING(REQREF ,10)) FROM accounting.`request_for_payment` WHERE YEAR(TS)=YEAR(NOW()) AND TITLEID = '".$companyId."'),0) + 1 'REF'");
        $getref = $dataREQREF[0]->REF;
        $ref = str_pad($getref, 4, "0", STR_PAD_LEFT); 
        $ref = "RFP-" . date('Y') . "-" . $ref;

        return $ref;
    }

    protected function getReRef($companyId){
        $ref = DB::select("SELECT IFNULL((SELECT MAX(SUBSTR(a.`REQREF`,9)) FROM accounting.`reimbursement_request` a WHERE YEAR(TS) = YEAR(NOW()) AND a.`TITLEID` = '".$companyId."'), FALSE) +1 AS 'ref'");
        $ref = $ref[0]->ref;
        $ref = str_pad($ref, 4, "0", STR_PAD_LEFT);
        $ref = "RE-" . date('Y') . "-" . $ref;

        return $ref;
    }

    protected function getDraftReRef($companyId){
        $ref = DB::select("SELECT IFNULL((SELECT MAX(SUBSTR(a.`DRAFT_NUM`,11)) FROM accounting.`reimbursement_request` a WHERE YEAR(TS) = YEAR(NOW()) AND a.`TITLEID` = '".$companyId."'), FALSE) +1 AS 'ref'");
        $ref = $ref[0]->ref;
        $ref = str_pad($ref, 4, "0", STR_PAD_LEFT);
        $ref = "REDR-" . date('Y') . "-" . $ref;

        return $ref;
    }

    protected function getPcRef($companyId){
        $dataREQREF = DB::select("SELECT IFNULL((SELECT MAX(SUBSTRING(REQREF ,10)) FROM accounting.`petty_cash_request` WHERE YEAR(TS)=YEAR(NOW()) AND TITLEID = '".$companyId."'),0) + 1 'REF'");
        $getref = $dataREQREF[0]->REF;
        $ref = str_pad($getref, 4, "0", STR_PAD_LEFT); 
        $ref = "PC-" . date('Y') . "-" . $ref;

        return $ref;
    }

    protected function getOtRef($companyId){
        $dataREQREF = DB::select("SELECT IFNULL((SELECT MAX(SUBSTRING(reference ,10)) FROM humanresource.`overtime_request` WHERE YEAR(request_date)=YEAR(NOW()) AND TITLEID = '".$companyId."'),0) + 1 'OTR'");
        $getref = $dataREQREF[0]->OTR;
        $ref = str_pad($getref, 4, "0", STR_PAD_LEFT); 
        $ref = "OTR-" . date('Y') . "-" . $ref;

        return $ref;
    }

    protected function getItfRef($companyId){
        $dataREQREF = DB::select("SELECT IFNULL((SELECT MAX(SUBSTRING(reference ,10)) FROM humanresource.`itinerary_main` WHERE YEAR(request_date)=YEAR(NOW()) AND TITLEID = '".$companyId."'),0) + 1 'ITF'");
        $getref = $dataREQREF[0]->ITF;
        $ref = str_pad($getref, 4, "0", STR_PAD_LEFT); 
        $ref = "ITF-" . date('Y') . "-" . $ref;

        return $ref;
    }

    protected function getLafRef($companyId){
        $dataREQREF = DB::select("SELECT IFNULL((SELECT MAX(SUBSTRING(reference ,10)) FROM humanresource.`leave_request` WHERE YEAR(request_date)=YEAR(NOW()) AND TITLEID = '".$companyId."'),0) + 1 'LAF'");
        $getref = $dataREQREF[0]->LAF;
        $ref = str_pad($getref, 4, "0", STR_PAD_LEFT); 
        $ref = "LAF-" . date('Y') . "-" . $ref;

        return $ref;
    }

    protected function getSofRef($companyId){
        $ref = DB::select("SELECT IFNULL ((SELECT MAX(SUBSTR(a.`soNum`,10)) FROM sales_order.`sales_orders` a WHERE YEAR(TS) = YEAR(NOW()) AND a.`titleid` = '".$companyId."'), FALSE) +1 AS 'ref'");
        $ref = $ref[0]->ref;
        $ref = str_pad($ref, 4, "0", STR_PAD_LEFT); 
        $ref = "SOF-" . date('Y') . "-" . $ref;

        return $ref;
    }

    protected function getCafRef($companyId) {
        $ref = DB::select("SELECT 
        IFNULL(
          (SELECT 
            MAX(SUBSTRING(reference, 10)) 
          FROM
            accounting.`cash_advance_request` 
          WHERE YEAR(ts) = YEAR(NOW()) 
            AND TITLEID = '".$companyId."'),
          0
        ) + 1 'ref' ");
        $ref = $ref[0]->ref;
        $ref = str_pad($ref, 5, "0", STR_PAD_LEFT); 
        $ref = "CAF-" . date('Y') . "-" . $ref;

        return $ref;
    }


    protected function showAll(Collection $collection, $code = 200){
        
        if ($collection->isEmpty()) {
            return response()->json(['error'=>'Does not exist, no result found any model with the specified identificator'
            ,'code' => 404], status:404);
		} 
        return $this->successResponse($collection, $code);
    }

    protected function showOne(Model $model, $code = 200){
        return response()->json(['data' => $model, 'code' => $code]);
    }


    protected function removeAttachments($request){
        // remove existing attachments
        $removedFiles = $request->removedFiles;
        $removedFiles = json_decode($removedFiles, true);

        // Log::alert(count($removedFiles));
        Log::alert($removedFiles);

        log::debug($removedFiles);
        

        if (count($removedFiles) > 0) {

            // DB::beginTransaction();
            // try{
            Log::alert($removedFiles);
            

            for ($i = 0; $i < count($removedFiles); $i++) {
                DB::table('general.attachments')->where('id', $removedFiles[$i]['id'])->delete();

                $public_path = public_path($removedFiles[$i]['filepath'] . '/' . $removedFiles[$i]['filename']);
                log::debug($public_path);
                unlink($public_path);
            }

            // DB::commit();

            // }catch(\Exception $e){
            //     DB::rollback();
            //     log::debug($e);
            // }

        }
    }

    protected function addAttachments($request){
        // Additional attachments

        if ($request->hasFile('file')) {

            foreach ($request->file as $file) {
                $completeFileName = $file->getClientOriginalName();
                $fileNameOnly     = pathinfo($completeFileName, PATHINFO_FILENAME);
                $fileNameOnly     = preg_replace('/[^A-Za-z0-9\-]/', '', $fileNameOnly);                                      // Removes special chars.
                $extension        = $file->getClientOriginalExtension();
                $randomized       = rand(1000,9999);
                $randomletter     = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 4); 
                $reqRef           = str_replace('-', '_', $request->referenceNumber);
                $reqRef           = str_replace('/', '_', $reqRef);
                $newFileName      = str_replace(' ', '', $fileNameOnly) . '-' . $randomletter. $randomized.'.' . $extension;
                $mimeType         = $file->getMimeType();

                // $date = date()
                // $myPath = "C:/Users/Iverson/Desktop/Attachments/".session('LoggedUser_CompanyID')."/RFP/".$rfpCode;

                $destinationPath = "public/Attachments/{$request->companyId}/{$request->class}/" . $reqRef;   // For moving the file
                $storagePath     = "storage/Attachments/{$request->companyId}/{$request->class}/" . $reqRef;  // For preview
                $file->storeAs($destinationPath, $newFileName);
                
                // $symPath = "public/Attachments/{$request->class}";
                // $fileDestination = $storagePath . '/' . $completeFileName;
                // $image = base64_encode(file_get_contents($file));

                // DB::table('repository.rfp')->insert([
                //     'REFID' => $request->processId,
                //     'FileName' => $completeFileName,
                //     'IMG' => $image,
                //     'UID' => $request->loggedUserId,
                //     'Ext' => $extension
                // ]);

                $attachmentsData = [
                    'INITID'           => $request->loggedUserId,
                    'REQID'            => $request->processId,
                    'filename'         => $newFileName,
                    'filepath'         => $storagePath,
                    'fileExtension'    => $extension,
                    'originalFilename' => $completeFileName,
                    'newFilename'      => $newFileName,
                    'fileDestination'  => $destinationPath,
                    'mimeType'         => $mimeType,
                    'formName'         => $request->form,
                    'created_at'       => date('Y-m-d H:i:s')
                ];
                Attachments:: insert($attachmentsData);
            }
        }
    }

    // Upon Createion
    protected function insertAttachments($request,$processId,$reference){
        // Additional attachments
        if ($request->hasFile('file')) {

            foreach ($request->file as $file) {
                $completeFileName = $file->getClientOriginalName();
                $fileNameOnly     = pathinfo($completeFileName, PATHINFO_FILENAME);
                $fileNameOnly     = preg_replace('/[^A-Za-z0-9\-]/', '', $fileNameOnly);                                      // Removes special chars.
                $extension        = $file->getClientOriginalExtension();
                $randomized       = rand(1000,9999);
                $randomletter     = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 4);
                $reqRef           = str_replace('-', '_', $reference);
                $newFileName      = str_replace(' ', '', $fileNameOnly) . '-' . $randomletter. $randomized.'.' . $extension;
                $mimeType         = $file->getMimeType();
                // $myPath = "C:/Users/Iverson/Desktop/Attachments/".session('LoggedUser_CompanyID')."/RFP/".$rfpCode;

                
                $destinationPath = "public/Attachments/{$request->companyId}/{$request->class}/" . $reqRef;   // For moving the file
                $storagePath     = "storage/Attachments/{$request->companyId}/{$request->class}/" . $reqRef;  // For preview
                $file->storeAs($destinationPath, $newFileName);
                // $symPath = "public/Attachments/{$request->class}";
                // $fileDestination = $storagePath . '/' . $completeFileName;
                // $image = base64_encode(file_get_contents($file));


                $attachmentsData = [
                    'INITID'           => $request->loggedUserId,
                    'REQID'            => $processId,
                    'filename'         => $newFileName,
                    'filepath'         => $storagePath,
                    'fileExtension'    => $extension,
                    'originalFilename' => $completeFileName,
                    'newFilename'      => $newFileName,
                    'fileDestination'  => $destinationPath,
                    'mimeType'         => $mimeType,
                    'formName'         => $request->form,
                    'created_at'       => date('Y-m-d H:i:s')
                ];

                Attachments:: insert($attachmentsData);
            }
        }
    }

    // insert attachment in master vendor
    protected function insertVendorAttachments($request){
        if ($request->hasFile('file')) {
            foreach ($request->file as $file) {
                $completeFileName = $file->getClientOriginalName();
                $fileNameOnly     = pathinfo($completeFileName, PATHINFO_FILENAME);
                $fileNameOnly     = preg_replace('/[^A-Za-z0-9\-]/', '', $fileNameOnly);                                      // Removes special chars.
                $extension        = $file->getClientOriginalExtension();
                $randomized       = rand(1000,9999);
                $randomletter     = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 4); 
                $newFileName      = str_replace(' ', '', $fileNameOnly) . '-' . $randomletter. $randomized.'.' . $extension;
                $mimeType         = $file->getMimeType();

                $destinationPath = "public/Attachments/{$request->companyId}/vendor/{$request->draftID}/{$request->category}";   // For moving the file
                $storagePath     = "storage/Attachments/{$request->companyId}/vendor/{$request->draftID}/{$request->category}";  // For preview
                $file->storeAs($destinationPath, $newFileName);
                
                $attachmentsData = [
                    'INITID'           => $request->loggedUserId,
                    'REQID'            => $request->draftID, //business number from business list
                    'filename'         => $newFileName,
                    'filepath'         => $storagePath,
                    'fileExtension'    => $extension,
                    'originalFilename' => $completeFileName,
                    'newFilename'      => $newFileName,
                    'fileDestination'  => $destinationPath,
                    'mimeType'         => $mimeType,
                    'formName'         => $request->formName,
                    'created_at'       => date('Y-m-d H:i:s')
                ];
                Attachments:: insert($attachmentsData);
            }
        }
    }

    protected function deleteItfDetails($request){
        ItfDetail::where('main_id', $request->processId)->delete();
    }

    protected function insertItfDetails($request){
        $itfData = $request->itineraryData;
        $itfData = json_decode($itfData, true);

        for ($i = 0; $i < count($itfData); $i++) {

            $time_start = date_create($itfData[$i]['time_start']);
            $time_end = date_create($itfData[$i]['time_end']);

            $actual_start = null;
            $actual_end = null;


            if ($request->isActual === 'true') {
                $actual_start = date_create($itfData[$i]['actual_start']);
                $actual_end = date_create($itfData[$i]['actual_end']);

                $actual_start = date_format($actual_start, 'Y-m-d H:i:s');
                $actual_end = date_format($actual_end, 'Y-m-d H:i:s');

            }

            $itfArray[] = [
                'main_id' => $request->processId,
                'client_id' => $itfData[$i]['client_id'],
                'client_name' => $itfData[$i]['client_name'],
                'time_start' => date_format($time_start, 'Y-m-d H:i:s'),
                'time_end' => date_format($time_end, 'Y-m-d H:i:s'),
                'actual_start' => $actual_start,
                'actual_end' => $actual_end,
                'purpose' => $itfData[$i]['purpose'],
            ];
        }
        ItfDetail::insert($itfArray);
    }

    // status turn to completed then next will be from not started to in progress
    protected function approveActualSIgnApi($request)
    {
        DB::update("UPDATE general.`actual_sign` a SET a.`webapp` ='1', a.`status` = 'Completed', a.`UID_SIGN` = '" . $request->loggedUserId . "', a.`SIGNDATETIME` = NOW(), a.`ApprovedRemarks` = '" . $request->remarks . "' WHERE a.`status` = 'In Progress' AND a.`PROCESSID` = '" . $request->processId . "' AND a.`FRM_NAME` = '" . $request->form . "' AND a.`COMPID` = '" . $request->companyId . "' ;");
        DB::update("UPDATE general.`actual_sign` a SET a.`status` = 'In Progress' WHERE a.`status` = 'Not Started' AND a.`PROCESSID` = '" . $request->processId . "' AND a.`FRM_NAME` = '" . $request->form . "' AND a.`COMPID` = '" . $request->companyId . "' LIMIT 1;");
    }

    protected function insertPcExpense($request ,$department, $guid){
        $xpData = $request->expenseData;
        $xpData = json_decode($xpData, true);
   
        if(count($xpData)){
            for ($i = 0; $i < count($xpData); $i++) {

                $date = date_create($xpData[$i]['date_']);
                $array[] = [
                    'PCID' => $request->processId,
                    'PAYEE' => $request->payeeName,
                    'CLIENT_NAME' => $xpData[$i]['CLIENT_NAME'],
                    'TITLEID' => $request->companyId,
                    'DESCRIPTION' => $xpData[$i]['DESCRIPTION'],
                    'AMOUNT' => floatval(str_replace(',', '', $xpData[$i]['AMOUNT'])),
                    'GUID' => $guid,
                    'TS' => now(),
                    'MAINID' => 1,
                    'CLIENT_ID' => $xpData[$i]['CLIENT_ID'],
                    'EXPENSE_TYPE' => $xpData[$i]['EXPENSE_TYPE'],
                    'DEPT' => $department,
                    'date_' => date_format($date, 'Y-m-d H:i:s'),
                ];
            }
            PcExpenseSetup::insert($array);
        }



    }

    protected function insertPcTranspo($request, $department, $guid){
        $trData = $request->transpoData;
        $trData = json_decode($trData, true);

        if(count($trData)){
        for ($i = 0; $i < count($trData); $i++) {

            $date = date_create($trData[$i]['date_']);

            $array[] = [
                'PCID' => $request->processId,
                'PAYEE' => $request->payeeName,
                'CLIENT_NAME' => $trData[$i]['CLIENT_NAME'],
                'DESTINATION_FRM' => $trData[$i]['DESTINATION_FRM'],
                'DESTINATION_TO' => $trData[$i]['DESTINATION_TO'],
                'DESCRIPTION' => $trData[$i]['DESCRIPTION'],
                'AMT_SPENT' => floatval(str_replace(',', '', $trData[$i]['AMT_SPENT'])),
                'TITLEID' => $request->companyId,
                'MOT' => $trData[$i]['MOT'],
                'GUID' => $guid,
                'TS' => now(),
                'MAINID' => 1,
                'CLIENT_ID' => $trData[$i]['CLIENT_ID'],
                'DEPT' => $department,
                'date_' => date_format($date, 'Y-m-d H:i:s'),
            ];
        }
        PcTranspoSetup::insert($array);
        }
    }




    protected function deletePcExpense($request){
        PcExpenseSetup::where('PCID', $request->processId)->delete();
    }


    protected function deletePcTranspo($request){
        PcTranspoSetup::where('PCID', $request->processId)->delete();
    }

    protected function insertLafMain($request,$mainID,$reqRef,$guid){
        $leaveData = $request->leaveData;
        $leaveData = json_decode($leaveData, true);


        // insert to hr.ot main table
        for ($i = 0; $i < count($leaveData); $i++) {

            $leaveArray[] = [
                'main_id' => $mainID,
                'reference' => $reqRef,
                'request_date' => date_create($request->requestedDate),
                'date_needed' => date_create($request->requestedDate),
                'employee_id' => $request->employeeId,
                'employee_name' => $request->employeeName,
                'medium_of_report' => $request->reportName,
                'report_time' => date_create($request->reportDateTime),
                'leave_type' => $leaveData[$i]['leave_type'],
                'leave_date' => $leaveData[$i]['leave_date'],
                'leave_paytype' => $leaveData[$i]['leave_paytype'],
                'leave_halfday' => $leaveData[$i]['leave_halfday'],
                'num_days' => $leaveData[$i]['num_days'],
                'reason' => $request->reason,
                'status' => 'In Progress',
                'UID' => $request->loggedUserId,
                'fname' => $request->loggedUserFirstName,
                'lname' => $request->loggedUserLastName,
                'position' => $request->loggedUserPosition,
                'reporting_manager' => $request->reportingManagerName,
                'department' => $request->loggedUserDepartment,
                'ts' => now(),
                'GUID' => $guid,
                'TITLEID' => $request->companyId,
            ];
        }
        LafMain::insert($leaveArray);
    }

    protected function deleteLafMain($request){
        LafMain::where('main_id', $request->processId)->delete();
    }

// SOF

    // get duration days
    // Date Accepted
    // $projectStart = date_create($request->projectStart); 
    // $projectStart = date_format($projectStart, 'Y-m-d');
    protected function dateDifference($projectStart, $projectEnd){
        $projectStartConverted = strtotime($projectStart);
        $projectEndConverted = strtotime($projectEnd);

        $projectDuation = ($projectEndConverted - $projectStartConverted)/60/60/24;
        return $projectDuation;
    }

    protected function dateFormatter($date){


        if ($date === 'null') {
            return null;

        } else {
            $date = date_create($date);
            $date = date_format($date, 'Y-m-d');
            return $date;

        }
        

    }

    protected function amountFormatter($amount){
        $amount = floatval(str_replace(',', '', $amount));
        return $amount;
    }

    protected function sofTypeConvert($sof){
        if($sof === 'DLV'){
            return ['Sales Order - Delivery', 6];
        }
        if($sof === 'PRJ'){
            return ['Sales Order - Project', 7];
        }
        if($sof === 'DMO'){
            return ['Sales Order - Demo', 4];
        }
        if($sof === 'POC'){
            return ['Sales Order - POC', 4];
        }
    }
}