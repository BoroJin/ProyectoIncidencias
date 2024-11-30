document.addEventListener('DOMContentLoaded', function () {
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationsList = document.getElementById('notificationsList');
    const notificationCount = document.getElementById('notificationCount');
    const markAllAsRead = document.getElementById('markAllAsRead');

    // Función para obtener todas las notificaciones
    function fetchAllNotifications() {
        fetch('{% url "get_notificaciones" %}')
            .then(response => response.json())
            .then(data => {
                displayNotifications(data.notificaciones);
            })
            .catch(error => {
                console.error('Error al obtener todas las notificaciones:', error);
            });
    }

    // Función para obtener solo las notificaciones no leídas
    function fetchUnreadNotifications() {
        fetch('{% url "get_notificaciones_no_leidas" %}')
            .then(response => response.json())
            .then(data => {
                displayNotifications(data.notificaciones);
            })
            .catch(error => {
                console.error('Error al obtener las notificaciones no leídas:', error);
            });
    }

    // Función para mostrar las notificaciones en la lista
    function displayNotifications(notifications) {
        notificationsList.innerHTML = '';
        if (notifications.length > 0) {
            const unreadIds = [];
            notifications.forEach(notif => {
                const notifItem = document.createElement('li');
                notifItem.innerHTML = `
                    <div class="dropdown-item ${notif.is_read ? '' : 'bg-light'}">
                        <div><strong>${notif.titulo}</strong></div>
                        <div>${notif.descripcion}</div>
                        <div><small>Incidencia ID: ${notif.incidenciaId || 'N/A'}</small></div>
                        <div><small class="text-muted">${notif.fecha_creacion}</small></div>
                    </div>
                `;
                notificationsList.appendChild(notifItem);
                if (!notif.is_read) unreadIds.push(notif.id);
            });
            notificationCount.textContent = unreadIds.length;
            notificationCount.classList.toggle('d-none', unreadIds.length === 0);

            // Marcar como leídas las notificaciones visibles en el dropdown
            if (unreadIds.length > 0) {
                markNotificationsAsRead(unreadIds);
            }
        } else {
            notificationsList.innerHTML = '<p class="dropdown-item text-center">No hay notificaciones nuevas</p>';
            notificationCount.textContent = '0';
            notificationCount.classList.add('d-none');
        }
    }

    // Función para marcar las notificaciones como leídas
    function markNotificationsAsRead(notificationIds = []) {
        fetch('{% url "mark_as_read" %}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ notification_ids: notificationIds })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                fetchUnreadNotifications(); // Recargar las notificaciones no leídas después de marcar como leídas
            }
        })
        .catch(error => {
            console.error('Error al marcar como leídas:', error);
        });
    }

    // Evento para cargar todas las notificaciones al hacer clic en el icono
    notificationDropdown.addEventListener('click', function () {
        fetchAllNotifications();
    });

    // Evento para marcar todas como leídas al hacer clic en "Marcar todas como leídas"
    markAllAsRead.addEventListener('click', function (e) {
        e.preventDefault();
        markNotificationsAsRead();  // Marcar todas las notificaciones como leídas
    });

    // Cargar solo las no leídas al inicio y actualizar cada 60 segundos
    fetchUnreadNotifications();
    setInterval(fetchUnreadNotifications, 60000);
});