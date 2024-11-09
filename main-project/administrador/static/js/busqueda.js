
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('buscar').addEventListener('input', function () {
        var filter = this.value.toLowerCase();
        var rows = document.querySelectorAll('#tabla_usuarios tr');

        rows.forEach(function (row) {
            // Asegurate de que hay al menos tres celdas antes de acceder a `cells[2]`
            if (row.cells.length > 2) {
                var userName = row.cells[2].textContent.toLowerCase(); // Nombre está en la tercera celda (indice 2)
                if (userName.includes(filter)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });
});