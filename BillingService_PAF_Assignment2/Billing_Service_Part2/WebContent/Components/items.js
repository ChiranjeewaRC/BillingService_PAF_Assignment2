$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
	{
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	 $("#alertSuccess").text("");
	 $("#alertSuccess").hide();
	 $("#alertError").text("");
	 $("#alertError").hide();
	 
	 // Form validation-------------------
	 var status = validateItemForm();
	 if (status != true)
	 {
		 $("#alertError").text(status);
		 $("#alertError").show();
		 return;
	 }
	 
	 // If valid------------------------
	 var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	 
	 $.ajax(
	 {
		 url : "BillingServiceAPI",
		 type : type,
		 data : $("#formItem").serialize(),
		 dataType : "text",
		 complete : function(response, status)
		 {
		 	onItemSaveComplete(response.responseText, status);
		 }
	 });
});


function onItemSaveComplete(response, status)
{
	 if (status == "success")
	 {
		 var resultSet = JSON.parse(response);
		 if (resultSet.status.trim() == "success")
		 {
		 $("#alertSuccess").text("Record Successfully Saved!");
		 $("#alertSuccess").show();
		 
		 $("#divItemsGrid").html(resultSet.data);
		 } else if (resultSet.status.trim() == "error")
		 {
		 $("#alertError").text(resultSet.data);
		 $("#alertError").show();
		 }
		 
	 } else if (status == "error")
	 {
		 $("#alertError").text("Error While Saving!");
		 $("#alertError").show();
	 } else
	 {
		 $("#alertError").text("Unknown Error While Saving!");
		 $("#alertError").show();
	 }
	 
	 $("#hidItemIDSave").val("");
	 $("#formItem")[0].reset();
}

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidItemIDSave").val($(this).data("itemid"));;
	$("#account_no").val($(this).closest("tr").find('td:eq(0)').text());
	$("#from_date").val($(this).closest("tr").find('td:eq(3)').text());
	$("#to_date").val($(this).closest("tr").find('td:eq(5)').text());
	$("#current_meter_reading").val($(this).closest("tr").find('td:eq(6)').text());
	$("#status").val($(this).closest("tr").find('td:eq(11)').text());
});

$(document).on("click", ".btnRemove", function(event)
{
	 $.ajax(
	 {
		 url : "BillingServiceAPI",
		 type : "DELETE",
		 data : "id=" + $(this).data("itemid"),
		 dataType : "text",
		 complete : function(response, status)
	 {
	 	onItemDeleteComplete(response.responseText, status);
	 }
	 });
});

function onItemDeleteComplete(response, status)
{
	 if (status == "success")
	 {
		 var resultSet = JSON.parse(response);
		 if (resultSet.status.trim() == "success")
		 {
		 $("#alertSuccess").text("Record Successfully Deleted!");
		 $("#alertSuccess").show();
		 $("#divItemsGrid").html(resultSet.data);
		 } else if (resultSet.status.trim() == "error")
		 {
		 $("#alertError").text(resultSet.data);
		 $("#alertError").show();
	 }
	 } else if (status == "error")
	 {
		 $("#alertError").text("Error While Deleting!");
		 $("#alertError").show();
	 } else
	 {
		 $("#alertError").text("Unknown Error While Deleting!");
		 $("#alertError").show();
	 }
}

// CLIENT-MODEL================================================================
function validateItemForm()
{
	// CODE
	if ($("#account_no").val().trim() == "")
	{
		return "Insert Account No!";
	}
		// NAME
		if ($("#from_date").val().trim() == "")
	{
		return "Insert From Date!";
	}
 
	// PRICE-------------------------------
	if ($("#to_date").val().trim() == "")
	{
		return "Insert To Date!";
	}
	
	// is numerical value
	var mtrReading = $("#current_meter_reading").val().trim();
	if (!$.isNumeric(mtrReading))
	{
		return "Insert a Numarical Value for Current Meter Reading!";
	}
	
	// convert to integer
	$("#current_meter_reading").val(parseInt(mtrReading));
	
	// DESCRIPTION------------------------
	if ($("#status").val().trim() == "")
	{
		return "Insert Status!";
	}
	return true;
}


