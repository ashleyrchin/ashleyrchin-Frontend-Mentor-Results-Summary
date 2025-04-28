document.addEventListener('DOMContentLoaded', async function() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error("Couldn't load results");
      const categories = await response.json();
      
      const container = document.querySelector('.category-list');
      
      const averageScore = Math.round(
        categories.reduce((sum, cat) => sum + cat.score, 0) / categories.length
      );
      document.querySelector('.score-circle .score-big').textContent = averageScore;
      
      container.innerHTML = categories.map(cat => `
        <div class="category ${cat.category.toLowerCase()}">
          <div class="category-info">
            <img src="${cat.icon}" alt="${cat.category}" class="category-icon">
            <span class="category-name">${cat.category}</span>
          </div>
          <div class="category-score">
            <span>${cat.score}</span> / 100
          </div>
        </div>
      `).join('');
      
    } catch (error) {
      console.error("Error loading results:", error);
      document.getElementById('categoryList').innerHTML = `
        <p class="error">Failed to load results. Please refresh the page.</p>
      `;
    }
});