<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="model.BillingModel" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/items.js"></script>
<title>Billing Service</title>
</head>
<body>

<div class="container">
<div class="row">
<div class="col-6">
	<h1>Billing Management</h1>
	<form id="formItem" name="formItem" method="post" action="BillingService.jsp">
		Account No:
		<input id="account_no" name="account_no" type="text" class="form-control form-control-sm">
		<br> From Date:
		<input id="from_date" name="from_date" type="text" class="form-control form-control-sm">
		<br> To Date:
		<input id="to_date" name="to_date" type="text" class="form-control form-control-sm">
		<br> Current Meter Reading:
		<input id="current_meter_reading" name="current_meter_reading" type="text" class="form-control form-control-sm">
		<br> Status:
		<input id="status" name="status" type="text" class="form-control form-control-sm">
		<br>
		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
		<input type="hidden" id="hidItemIDSave" name="hidItemIDSave" value="">
	</form>

	<div id="alertSuccess" class="alert alert-success"></div>
	<div id="alertError" class="alert alert-danger"></div>
	
	<br>

	<div class="row">
		<div class="col-12" id="divItemsGrid">
			<%
				BillingModel billObj = new BillingModel();
				out.print(billObj.readBillDetails());
			%>
		</div>
	</div>


</div>
</div>
</div>

</body>
</html>