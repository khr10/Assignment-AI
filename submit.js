<!DOCTYPE html>
<html lang="en">
<head>
    <body>
        <body style="background-color: #020202;">
            <!-- page content goes here -->
    </body>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub User Search</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f8;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .search-container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 100%;
            max-width: 400px;
        }

        .search-container h1 {
            margin-bottom: 20px;
            font-size: 24px;
            color: #333333;
        }

        .search-container input[type="text"] {
            width: 100%;
            padding: 12px 20px;
            margin-bottom: 20px;
            font-size: 16px;
            border: 1px solid #dddddd;
            border-radius: 5px;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }

        .search-container input[type="text"]:focus {
            border-color: #007bff;
            outline: none;
        }

        .search-container button {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            background-color: #007bff;
            color: #ffffff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .search-container button:hover {
            background-color: #0056b3;
        }

        .search-container .error-message {
            color: #ff4d4f;
            margin-top: 10px;
        }

        .user-info {
            margin-top: 30px;
            text-align: left;
        }

        .user-info img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 15px;
        }

        .user-info h2 {
            margin: 0;
            font-size: 22px;
            color: #333333;
        }

        .user-info p {
            margin: 5px 0;
            color: #666666;
        }

        .repositories {
            margin-top: 30px;
            text-align: left;
        }

        .repositories h3 {
            font-size: 20px;
            color: #333333;
            margin-bottom: 15px;
        }

        .repositories ul {
            list-style: none;
            padding: 0;
        }

        .repositories li {
            background-color: #f4f6f8;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .repositories li:hover {
            background-color: #e9ecef;
        }

        .repositories a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
        }

        .repositories a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="search-container">
        <h1>Search GitHub User</h1>
        <input type="text" id="github-username" placeholder="Enter GitHub username">
        <button id="search-button">Search</button>
        <p id="error-message" class="error-message" style="display: none;">User not found. Please try again.</p>

        <div id="user-info" class="user-info" style="display: none;">
            <img id="user-avatar" src="" alt="avatar">
            <h2 id="user-name"></h2>
            <p id="user-bio"></p>
        </div>

        <div id="repositories" class="repositories" style="display: none;">
            <h3>Repositories:</h3>
            <ul id="repo-list"></ul>
        </div>
    </div>

    <script>
        document.getElementById('search-button').addEventListener('click', async function() {
            const username = document.getElementById('github-username').value;
            const errorMessage = document.getElementById('error-message');
            const userInfo = document.getElementById('user-info');
            const repositories = document.getElementById('repositories');
            const repoList = document.getElementById('repo-list');

            if (!username) {
                alert('Please enter a GitHub username');
                return;
            }

            try {
                // Fetch user info
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                if (!userResponse.ok) throw new Error('User not found');
                const userData = await userResponse.json();

                // Fetch repositories
                const repoResponse = await fetch(userData.repos_url);
                if (!repoResponse.ok) throw new Error('Repositories not found');
                const repoData = await repoResponse.json();

                // Update UI with user info
                document.getElementById('user-avatar').src = userData.avatar_url;
                document.getElementById('user-name').textContent = userData.name || userData.login;
                document.getElementById('user-bio').textContent = userData.bio || 'No bio available';
                userInfo.style.display = 'block';

                // Update UI with repositories
                repoList.innerHTML = '';
                repoData.forEach(repo => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>`;
                    repoList.appendChild(li);
                });
                repositories.style.display = 'block';

                errorMessage.style.display = 'none';
            } catch (err) {
                errorMessage.textContent = err.message;
                errorMessage.style.display = 'block';
                userInfo.style.display = 'none';
                repositories.style.display = 'none';
            }
        });
    </script>
</body>
</html>
