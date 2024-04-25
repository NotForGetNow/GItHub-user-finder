$(document).ready(function() {
    $('#search-button').on('click', function() {
      var username = $('#search-input').val();
      if(username.trim() !== '') {
        searchGitHubUser(username);
      } else {
        alert('Please enter a username.');
      }
    });
  
    function searchGitHubUser(username) {
      $.ajax({
        url: 'https://api.github.com/users/' + username,
        method: 'GET',
        success: function(response) {
          displayProfile(response);
        },
        error: function(xhr, status, error) {
          alert('User not found or API request failed.');
        }
      });
    }
  
    function displayProfile(user) {
      var profileHtml = `
        <div class="profile-card">
          <img src="${user.avatar_url}" alt="Avatar" class="avatar" />
          <div class="info">
            <p><strong>Name:</strong> ${user.name ? user.name : 'N/A'}</p>
            <p><strong>Location:</strong> ${user.location ? user.location : 'N/A'}</p>
            <p><strong>Followers:</strong> ${user.followers}</p>
            <p><strong>Following:</strong> ${user.following}</p>
            <p><strong>Public Repos:</strong> ${user.public_repos}</p>
            <button class="delete-button">Delete</button>
          </div>
        </div>
      `;
      $('#profile-container').html(profileHtml);
  
      // Привязываем обработчик события click для кнопки удаления
      $('.delete-button').on('click', function() {
        $(this).closest('.profile-card').remove();
      });
    }
  });
  