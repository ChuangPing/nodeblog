function serializeArrayToJson (from) {
    var formData = $(from).serializeArray();
    var data = {};
    formData.forEach(function(item) {
        data[item.name] = item.value;
    });
    return data
}