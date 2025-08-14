export const ANGULAR_WORDS = [
  // 1. Button
  `<button (click)="handleClick()" [disabled]="disabled" type="submit" class="btn-primary">↵→<ng-content></ng-content>↵</button>`,

  // 2. Input
  `<input↵→[(ngModel)]="value"↵→(ngModelChange)="handleChange($event)"↵→placeholder="Enter text"↵→type="text"↵→[disabled]="disabled"↵→[required]="required"↵→name="inputName"↵→class="form-input"↵/>`,

  // 3. Label
  `<label [for]="inputId" class="form-label" [attr.required]="required ? true : null">↵→{{ labelText }}↵</label>`,

  // 4. TextArea
  `<textarea↵→[(ngModel)]="value"↵→(ngModelChange)="handleChange($event)"↵→placeholder="Enter message"↵→rows="4"↵→cols="50"↵→[disabled]="disabled"↵→class="form-textarea"↵→maxlength="500"↵></textarea>`,

  // 5. Select
  `<select [(ngModel)]="selectedValue" (change)="handleChange($event)" [disabled]="disabled" class="form-select">↵→<option value="">Choose option</option>↵→<option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>↵</select>`,

  // 6. Checkbox
  `<div class="checkbox-wrapper">↵→<input↵→→type="checkbox"↵→→[checked]="checked"↵→→(change)="handleChange($event)"↵→→[disabled]="disabled"↵→→id="checkbox1"↵→→value="checkboxValue"↵→/>↵→<label for="checkbox1">{{ label }}</label>↵</div>`,

  // 7. Radio
  `<div class="radio-wrapper">↵→<input↵→→type="radio"↵→→[checked]="checked"↵→→(change)="handleChange($event)"↵→→name="radioGroup"↵→→value="radioValue"↵→→id="radio1"↵→/>↵→<label for="radio1">{{ label }}</label>↵</div>`,

  // 8. Form
  `<form (ngSubmit)="handleSubmit()" class="form" [attr.novalidate]="false" autocomplete="on">↵→<ng-content></ng-content>↵</form>`,

  // 9. Modal
  `<div [ngClass]="{'modal-overlay active': isOpen, 'modal-overlay': !isOpen}">↵→<div class="modal-content">↵→→<div class="modal-header">↵→→→<h2>{{ title }}</h2>↵→→→<button (click)="onClose()" class="modal-close">&times;</button>↵→→</div>↵→→<div class="modal-body">↵→→→<ng-content></ng-content>↵→→</div>↵→</div>↵</div>`,

  // 10. Card
  `<div class="card" (click)="handleClick()">↵→<div class="card-header">↵→→<h3 class="card-title">{{ title }}</h3>↵→→<p class="card-subtitle">{{ subtitle }}</p>↵→</div>↵→<div class="card-body">↵→→<ng-content></ng-content>↵→</div>↵→<div class="card-footer">{{ footer }}</div>↵</div>`,

  // 11. Avatar
  `<div class="avatar avatar-medium avatar-circle" (click)="handleClick()">↵→<img *ngIf="src; else fallback" [src]="src" [alt]="alt" />↵→<ng-template #fallback>↵→→<span class="avatar-fallback">{{ initials }}</span>↵→</ng-template>↵</div>`,

  // 12. Badge
  `<span class="badge badge-primary badge-medium" (click)="handleClick()">↵→<ng-content></ng-content>↵</span>`,

  // 13. Alert
  `<div class="alert alert-info">↵→<h4 class="alert-title">{{ title }}</h4>↵→<div class="alert-message"><ng-content></ng-content></div>↵→<button class="alert-dismiss" (click)="onDismiss()">&times;</button>↵</div>`,

  // 14. Breadcrumb
  `<nav class="breadcrumb">↵→<ng-container *ngFor="let item of items; let i = index">↵→→<span class="breadcrumb-item">↵→→→<a [href]="item.href" (click)="item.onClick && item.onClick($event)">{{ item.label }}</a>↵→→→<span *ngIf="i < items.length - 1" class="breadcrumb-separator">/</span>↵→→</span>↵→</ng-container>↵</nav>`,

  // 15. Dropdown
  `<div class="dropdown">↵→<button class="dropdown-trigger" (click)="toggleDropdown()">↵→→{{ triggerText }}↵→</button>↵→<div *ngIf="isOpen" class="dropdown-menu">↵→→<div *ngFor="let option of options; let i = index"↵→→→class="dropdown-item"↵→→→(click)="option.onClick && option.onClick($event)">↵→→→{{ option.label }}↵→→</div>↵→</div>↵</div>`,

  // 16. Tabs
  `<div class="tabs">↵→<div class="tab-list">↵→→<button *ngFor="let tab of tabs"↵→→→→[class.active]="activeTab === tab.id"↵→→→→class="tab-button"↵→→→→(click)="setActiveTab(tab.id)">↵→→→{{ tab.label }}↵→→</button>↵→</div>↵→<div class="tab-content">↵→→{{ tabs.find(tab => tab.id === activeTab)?.content }}↵→</div>↵</div>`,

  // 17. Accordion
  `<div class="accordion">↵→<div *ngFor="let item of items" class="accordion-item">↵→→<button class="accordion-header" (click)="toggleItem(item.id)">↵→→→{{ item.title }}↵→→</button>↵→→<div *ngIf="openItems.includes(item.id)" class="accordion-content">↵→→→{{ item.content }}↵→→</div>↵→</div>↵</div>`,

  // 18. Tooltip
  `<div class="tooltip-wrapper">↵→<ng-content></ng-content>↵→<div class="tooltip tooltip-top">↵→→{{ tooltipContent }}↵→</div>↵</div>`,

  // 19. Spinner
  `<div class="spinner spinner-medium">↵→<div class="spinner-circle"></div>↵→<span class="spinner-label">{{ loadingText }}</span>↵</div>`,

  // 20. Progress
  `<div class="progress progress-medium">↵→<div class="progress-bar progress-primary"↵→→ [style.width.%]="(value / max) * 100"></div>↵→<span class="progress-label">{{ (value / max * 100) | number:'1.0-0' }}%</span>↵</div>`,

  // 21. Slider
  `<div class="slider-wrapper">↵→<input↵→→type="range"↵→→[(ngModel)]="value"↵→→(ngModelChange)="handleChange($event)"↵→→[min]="min"↵→→[max]="max"↵→→[step]="step"↵→→class="slider"↵→/>↵→<span class="slider-value">{{ value }}</span>↵</div>`,

  // 22. Switch
  `<div class="switch-wrapper">↵→<label class="switch switch-medium">↵→→<input↵→→→type="checkbox"↵→→→[checked]="checked"↵→→→(change)="handleChange($event)"↵→→→[disabled]="disabled"↵→→/>↵→→<span class="switch-slider"></span>↵→</label>↵→<span class="switch-label">{{ label }}</span>↵</div>`,

  // 23. Image
  `<img↵→[src]="src"↵→[alt]="alt"↵→[width]="width"↵→[height]="height"↵→class="responsive-image"↵→loading="lazy"↵→(load)="handleLoad()"↵→(error)="handleError()"↵→[style.objectFit]="'cover'"↵/>`,

  // 24. Link
  `<a↵→[href]="href"↵→(click)="handleClick($event)"↵→target="_blank"↵→rel="noopener noreferrer"↵→class="link"↵>↵→<ng-content></ng-content>↵</a>`,

  // 25. List
  `<ul class="list">↵→<li *ngFor="let item of items"↵→→class="list-item"↵→→(click)="item.onClick && item.onClick($event)">↵→→{{ item.content }}↵→</li>↵</ul>`,

  // 26. Table
  `<table class="table table-striped">↵→<thead>↵→→<tr>↵→→→<th *ngFor="let column of columns" (click)="handleSort(column.key)">↵→→→→{{ column.title }}↵→→→</th>↵→→</tr>↵→</thead>↵→<tbody>↵→→<tr *ngFor="let row of data; let i = index" (click)="handleRowClick(row)">↵→→→<td *ngFor="let column of columns">↵→→→→{{ row[column.key] }}↵→→→</td>↵→→</tr>↵→</tbody>↵</table>`,

  // 27. Pagination
  `<nav class="pagination">↵→<button (click)="onPageChange(1)" [disabled]="currentPage === 1">First</button>↵→<button (click)="onPageChange(currentPage - 1)" [disabled]="currentPage === 1">Previous</button>↵→<span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>↵→<button (click)="onPageChange(currentPage + 1)" [disabled]="currentPage === totalPages">Next</button>↵→<button (click)="onPageChange(totalPages)" [disabled]="currentPage === totalPages">Last</button>↵</nav>`,

  // 28. SearchInput
  `<div class="search-input">↵→<input↵→→type="text"↵→→[(ngModel)]="searchValue"↵→→(ngModelChange)="handleSearchChange($event)"↵→→placeholder="Search..."↵→→class="search-field"↵→/>↵→<button (click)="handleSearch()" class="search-button">Search</button>↵→<button *ngIf="searchValue" (click)="clearSearch()" class="search-clear">Clear</button>↵</div>`,

  // 29. DatePicker
  `<div class="datepicker">↵→<input↵→→type="date"↵→→[(ngModel)]="selectedDate"↵→→(ngModelChange)="handleDateChange($event)"↵→→[min]="minDate"↵→→[max]="maxDate"↵→→class="datepicker-input"↵→/>↵→<button *ngIf="selectedDate" (click)="clearDate()" class="datepicker-clear">Clear</button>↵</div>`,

  // 30. TimePicker
  `<input↵→type="time"↵→[(ngModel)]="selectedTime"↵→(ngModelChange)="handleTimeChange($event)"↵→step="60"↵→class="timepicker"↵/>`,

  // 31. ColorPicker
  `<div class="color-picker">↵→<input↵→→type="color"↵→→[(ngModel)]="selectedColor"↵→→(ngModelChange)="handleColorChange($event)"↵→→class="color-input"↵→/>↵→<div class="color-presets">↵→→<button *ngFor="let color of presetColors"↵→→→→class="color-preset"↵→→→→[style.backgroundColor]="color"↵→→→→(click)="setSelectedColor(color)">↵→→</button>↵→</div>↵</div>`,

  // 32. FileUpload
  `<div class="file-upload">↵→<input↵→→type="file"↵→→(change)="handleFileSelect($event)"↵→→accept=".jpg,.png,.pdf"↵→→multiple↵→→class="file-input"↵→/>↵→<label class="file-label">Choose Files or Drag & Drop</label>↵</div>`,

  // 33. Rating
  `<div class="rating">↵→<button *ngFor="let star of [1,2,3,4,5]"↵→→→[class.filled]="rating >= star"↵→→→class="star"↵→→→(click)="setRating(star)">↵→→*↵→</button>↵</div>`,

  // 34. Tag
  `<span class="tag tag-primary">↵→{{ tagText }}↵→<button class="tag-remove" (click)="handleRemove()">x</button>↵</span>`,

  // 35. Chip
  `<div class="chip">↵→<img *ngIf="avatar" [src]="avatar" alt="" class="chip-avatar" />↵→<span class="chip-text">{{ text }}</span>↵→<button *ngIf="removable" class="chip-remove" (click)="onRemove()">x</button>↵</div>`,

  // 36. Stepper
  `<div class="stepper">↵→<div *ngFor="let step of steps; let i = index"↵→→ [class.active]="currentStep >= i"↵→→ class="step">↵→→<div class="step-indicator">{{ i + 1 }}</div>↵→→<div class="step-content">↵→→→<div class="step-title">{{ step.title }}</div>↵→→→<div class="step-description">{{ step.description }}</div>↵→→</div>↵→</div>↵</div>`,

  // 37. Skeleton
  `<div class="skeleton">↵→<div class="skeleton-line skeleton-title"></div>↵→<div class="skeleton-line skeleton-text"></div>↵→<div class="skeleton-line skeleton-text short"></div>↵</div>`,

  // 38. Empty State
  `<div class="empty-state">↵→<div class="empty-icon">{{ icon }}</div>↵→<h3 class="empty-title">{{ title }}</h3>↵→<p class="empty-description">{{ description }}</p>↵→<button *ngIf="action" class="empty-action" (click)="action.onClick()">↵→→{{ action.text }}↵→</button>↵</div>`,

  // 39. Grid
  `<div class="grid grid-cols-3 gap-4">↵→<div *ngFor="let item of items" class="grid-item">↵→→{{ item.content }}↵→</div>↵</div>`,

  // 40. Header
  `<header class="header">↵→<div class="header-brand">↵→→<img [src]="logo" alt="Logo" class="header-logo" />↵→→<h1 class="header-title">{{ title }}</h1>↵→</div>↵→<nav class="header-nav">↵→→<a *ngFor="let item of navItems"↵→→→ [href]="item.href"↵→→→ class="header-nav-item">↵→→→{{ item.label }}↵→→</a>↵→</nav>↵</header>`,

  // 41. Footer
  `<footer class="footer">↵→<div class="footer-content">↵→→<div class="footer-section">↵→→→<h3 class="footer-title">{{ title }}</h3>↵→→→<p class="footer-text">{{ content }}</p>↵→→</div>↵→→<div class="footer-links">↵→→→<a *ngFor="let link of links"↵→→→→ [href]="link.href"↵→→→→ class="footer-link">↵→→→→{{ link.label }}↵→→→</a>↵→→</div>↵→</div>↵→<div class="footer-bottom">↵→→<p>&copy; {{ currentYear }} {{ companyName }}</p>↵→</div>↵</footer>`,

  // 42. Navbar
  `<nav class="navbar">↵→<div class="navbar-brand">↵→→<a href="/" class="navbar-brand-link">{{ brandName }}</a>↵→</div>↵→<div class="navbar-menu">↵→→<a *ngFor="let item of menuItems"↵→→→ [href]="item.href"↵→→→ class="navbar-item">↵→→→{{ item.label }}↵→→</a>↵→</div>↵→<button class="navbar-toggle" (click)="toggleMenu()">☰</button>↵</nav>`,

  // 43. Toast
  `<div class="toast toast-success">↵→<div class="toast-icon">{{ icon }}</div>↵→<div class="toast-content">↵→→<div class="toast-title">{{ title }}</div>↵→→<div class="toast-message">{{ message }}</div>↵→</div>↵→<button class="toast-close" (click)="onClose()">x</button>↵</div>`,

  // 44. Button Group
  `<div class="button-group">↵→<button *ngFor="let button of buttons; let i = index"↵→→→ [class.active]="button.active"↵→→→ class="button"↵→→→ (click)="button.onClick()">↵→→{{ button.label }}↵→</button>↵</div>`,

  // 45. Form Group
  `<div class="form-group">↵→<label class="form-label" [for]="inputId">↵→→{{ label }}↵→→<span *ngIf="required" class="required">*</span>↵→</label>↵→<input↵→→[id]="inputId"↵→→[type]="inputType"↵→→[(ngModel)]="value"↵→→(ngModelChange)="handleChange($event)"↵→→class="form-input"↵→→[required]="required"↵→/>↵→<span *ngIf="error" class="form-error">{{ error }}</span>↵→<span *ngIf="helperText" class="form-helper">{{ helperText }}</span>↵</div>`,

  // 46. Radio Group
  `<div class="radio-group">↵→<div class="radio-group-label">{{ label }}</div>↵→<div *ngFor="let option of options" class="radio-option">↵→→<input↵→→→type="radio"↵→→→[id]="option.value"↵→→→[name]="name"↵→→→[value]="option.value"↵→→→[checked]="selectedValue === option.value"↵→→→(change)="handleChange(option.value)"↵→→/>↵→→<label [for]="option.value">{{ option.label }}</label>↵→</div>↵</div>`,

  // 47. Number Input
  `<div class="number-input">↵→<button↵→→class="number-input-decrease"↵→→(click)="setValue(value - step)"↵→→[disabled]="value <= min"↵→>-</button>↵→<input↵→→type="number"↵→→[(ngModel)]="value"↵→→(ngModelChange)="handleChange($event)"↵→→[min]="min"↵→→[max]="max"↵→→[step]="step"↵→→class="number-input-field"↵→/>↵→<button↵→→class="number-input-increase"↵→→(click)="setValue(value + step)"↵→→[disabled]="value >= max"↵→>+</button>↵</div>`,

  // 48. Loading Button
  `<button class="button loading" [disabled]="isLoading" (click)="handleClick()">↵→<span *ngIf="isLoading" class="button-spinner"></span>↵→{{ isLoading ? loadingText : buttonText }}↵</button>`,

  // 49. Icon Button
  `<button class="icon-button" (click)="handleClick()" [attr.aria-label]="ariaLabel">↵→<span class="icon">{{ icon }}</span>↵</button>`,

  // 50. Multi Select
  `<div class="multi-select">↵→<div class="multi-select-control" (click)="toggleDropdown()">↵→→<div class="multi-select-value">↵→→→{{ selectedItems.length > 0 ? (selectedItems.length + ' selected') : placeholder }}↵→→</div>↵→→<span class="multi-select-arrow"></span>↵→</div>↵→<div *ngIf="isOpen" class="multi-select-dropdown">↵→→<div *ngFor="let option of options"↵→→→→class="multi-select-option"↵→→→→(click)="toggleOption(option.value)">↵→→→<input↵→→→→type="checkbox"↵→→→→[checked]="selectedItems.includes(option.value)"↵→→→→readonly↵→→→/>↵→→→{{ option.label }}↵→→</div>↵→</div>↵</div>`,
];
