 // Add event handler for checkboxes
        $(':checkbox').click(function () {
            applyFilters();
        });

        // Apply filters on page load
        applyFiltersFromUrl();

        // Rest of your code remains here

        // Function to apply filters based on URL parameters
        function applyFiltersFromUrl() {
            // Get the filter values from the URL
            var urlParams = new URLSearchParams(window.location.search);
            var filterValues = urlParams.get("filter");
            var priceFilterValues = urlParams.get("price");

            if (filterValues) {
                // Split the filter values by comma and store them in an array
                var selectedFilters = filterValues.split(",");
                // Loop through the selectedFilters array and check the corresponding checkboxes
                selectedFilters.forEach(function (filter) {
                    $('#' + filter).prop('checked', true);
                });
            }

            // Apply price filters from URL if available
            if (priceFilterValues) {
                var priceFilters = priceFilterValues.split(",");
                // Implement your logic to select the price filters based on priceFilters array
            }

            // Apply the filters on page load
            applyFilters();
        }

        function applyFilters() {
            // Collect selected checkbox filters
            var checkboxFilters = [];
            $(':checkbox:checked').each(function () {
                checkboxFilters.push($(this).val());
            });

            // Get the selected price filters if applicable
            var priceFilters = []; // Implement your logic to get the selected price filters

            // Combine all the filters in a single object
            var filters = {
                checkbox: checkboxFilters,
                price: priceFilters
            };

            // Call the function to get products based on the combined filters
            getProducts({
                page: activePage,
                pageSize: itemsPerPage,
                filters: filters // Pass the filters object to the server
            }, function (data) {
                updatePagination(data);
            });

            // Update the URL with the selected filters
            var newUrl = updateUrlParameter(window.location.href, "filter", checkboxFilters.join(","));
            newUrl = updateUrlParameter(newUrl, "price", priceFilters.join(",")); // Update URL for price filters
            history.pushState(null, null, newUrl);
        }
