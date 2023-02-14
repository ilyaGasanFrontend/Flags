$(document).ready(function() {
    $('.searchCity').select2({
        placeholder: 'Начните водить город...',
        // selectionCssClass: 'form-control',
        // theme: 'bootstrap-4',
        minimumInputLength: 3,
        tags: true,
        language: {
            inputTooShort: function() {
                return "Ведите не мение 3 символов";
            },
            noResults: function() {
                return "Нет результатов";
            },
            searching: function() {
                return "Поиск...";
            }
        },
        ajax: {
            url: 'autocompletecity',
            dataType: 'json',
            delay: 100,
            processResults: function(data) {
                return {
                    results: $.map(data, function(item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            },
            cache: true
        },
        templateSelection: function(data, container) {
            // Add custom attributes to the <option> tag for the selected option
            $(data.element).attr('data-custom-attribute', data
                .customValue);
            // alert(data.text);
            // street = data.text;
            // console.log(street);
            return data.text;
        }
    });

    $('.searchCity').on('select2:open', function() {
        document.querySelector('.select2-search__field').focus();
    });

    $('#inputCity').on('select2:closing', function(e) {
        //   alert(e);
        street = $('#select2-inputCity-container').text();
        $('#city_name').val(street);
    });

   
});
