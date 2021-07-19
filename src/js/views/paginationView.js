import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const markup1 = `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    `;
    const markup2 = `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
    if (curPage === 1 && numPages > 1) {
      return markup2;
    }
    // Page 1, and there are NO other pages
    // Last page
    if (curPage === numPages && numPages > 1) {
      return markup1;
    }
    // Other page
    if (curPage < numPages) {
      return `${markup1} ${markup2}`;
    }

    // Page 1, and there are other pages
    return '';
  }
}

export default new PaginationView();
