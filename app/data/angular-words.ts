export const ANGULAR_WORDS = [
  // 1. Button
  `<button (click)="handleClick()" [disabled]="disabled" type="submit" class="btn-primary">\n\t<ng-content></ng-content>\n</button>`,

  // 2. Input
  `<input\n\t[(ngModel)]="value"\n\t(ngModelChange)="handleChange($event)"\n\tplaceholder="Enter text"\n\ttype="text"\n\t[disabled]="disabled"\n\t[required]="required"\n\tname="inputName"\n\tclass="form-input"\n/>`,

  // 3. Label
  `<label [for]="inputId" class="form-label" [attr.required]="required ? true : null">\n\t{{ labelText }}\n</label>`,

  // 4. TextArea
  `<textarea\n\t[(ngModel)]="value"\n\t(ngModelChange)="handleChange($event)"\n\tplaceholder="Enter message"\n\trows="4"\n\tcols="50"\n\t[disabled]="disabled"\n\tclass="form-textarea"\n\tmaxlength="500"\n></textarea>`,

  // 5. Select
  `<select [(ngModel)]="selectedValue" (change)="handleChange($event)" [disabled]="disabled" class="form-select">\n\t<option value="">Choose option</option>\n\t<option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>\n</select>`,

  // 6. Checkbox
  `<div class="checkbox-wrapper">\n\t<input\n\t\ttype="checkbox"\n\t\t[checked]="checked"\n\t\t(change)="handleChange($event)"\n\t\t[disabled]="disabled"\n\t\tid="checkbox1"\n\t\tvalue="checkboxValue"\n\t/>\n\t<label for="checkbox1">{{ label }}</label>\n</div>`,

  // 7. Radio
  `<div class="radio-wrapper">\n\t<input\n\t\ttype="radio"\n\t\t[checked]="checked"\n\t\t(change)="handleChange($event)"\n\t\tname="radioGroup"\n\t\tvalue="radioValue"\n\t\tid="radio1"\n\t/>\n\t<label for="radio1">{{ label }}</label>\n</div>`,

  // 8. Form
  `<form (ngSubmit)="handleSubmit()" class="form" [attr.novalidate]="false" autocomplete="on">\n\t<ng-content></ng-content>\n</form>`,

  // 9. Modal
  `<div [ngClass]="{'modal-overlay active': isOpen, 'modal-overlay': !isOpen}">\n\t<div class="modal-content">\n\t\t<div class="modal-header">\n\t\t\t<h2>{{ title }}</h2>\n\t\t\t<button (click)="onClose()" class="modal-close">&times;</button>\n\t\t</div>\n\t\t<div class="modal-body">\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t</div>\n</div>`,

  // 10. Card
  `<div class="card" (click)="handleClick()">\n\t<div class="card-header">\n\t\t<h3 class="card-title">{{ title }}</h3>\n\t\t<p class="card-subtitle">{{ subtitle }}</p>\n\t</div>\n\t<div class="card-body">\n\t\t<ng-content></ng-content>\n\t</div>\n\t<div class="card-footer">{{ footer }}</div>\n</div>`,

  // 11. Avatar
  `<div class="avatar avatar-medium avatar-circle" (click)="handleClick()">\n\t<img *ngIf="src; else fallback" [src]="src" [alt]="alt" />\n\t<ng-template #fallback>\n\t\t<span class="avatar-fallback">{{ initials }}</span>\n\t</ng-template>\n</div>`,

  // 12. Badge
  `<span class="badge badge-primary badge-medium" (click)="handleClick()">\n\t<ng-content></ng-content>\n</span>`,

  // 13. Alert
  `<div class="alert alert-info">\n\t<h4 class="alert-title">{{ title }}</h4>\n\t<div class="alert-message"><ng-content></ng-content></div>\n\t<button class="alert-dismiss" (click)="onDismiss()">&times;</button>\n</div>`,

  // 14. Breadcrumb
  `<nav class="breadcrumb">\n\t<ng-container *ngFor="let item of items; let i = index">\n\t\t<span class="breadcrumb-item">\n\t\t\t<a [href]="item.href" (click)="item.onClick && item.onClick($event)">{{ item.label }}</a>\n\t\t\t<span *ngIf="i < items.length - 1" class="breadcrumb-separator">/</span>\n\t\t</span>\n\t</ng-container>\n</nav>`,

  // 15. Dropdown
  `<div class="dropdown">\n\t<button class="dropdown-trigger" (click)="toggleDropdown()">\n\t\t{{ triggerText }}\n\t</button>\n\t<div *ngIf="isOpen" class="dropdown-menu">\n\t\t<div *ngFor="let option of options; let i = index"\n\t\t\tclass="dropdown-item"\n\t\t\t(click)="option.onClick && option.onClick($event)">\n\t\t\t{{ option.label }}\n\t\t</div>\n\t</div>\n</div>`,

  // 16. Tabs
  `<div class="tabs">\n\t<div class="tab-list">\n\t\t<button *ngFor="let tab of tabs"\n\t\t\t\t[class.active]="activeTab === tab.id"\n\t\t\t\tclass="tab-button"\n\t\t\t\t(click)="setActiveTab(tab.id)">\n\t\t\t{{ tab.label }}\n\t\t</button>\n\t</div>\n\t<div class="tab-content">\n\t\t{{ tabs.find(tab => tab.id === activeTab)?.content }}\n\t</div>\n</div>`,

  // 17. Accordion
  `<div class="accordion">\n\t<div *ngFor="let item of items" class="accordion-item">\n\t\t<button class="accordion-header" (click)="toggleItem(item.id)">\n\t\t\t{{ item.title }}\n\t\t</button>\n\t\t<div *ngIf="openItems.includes(item.id)" class="accordion-content">\n\t\t\t{{ item.content }}\n\t\t</div>\n\t</div>\n</div>`,

  // 18. Tooltip
  `<div class="tooltip-wrapper">\n\t<ng-content></ng-content>\n\t<div class="tooltip tooltip-top">\n\t\t{{ tooltipContent }}\n\t</div>\n</div>`,

  // 19. Spinner
  `<div class="spinner spinner-medium">\n\t<div class="spinner-circle"></div>\n\t<span class="spinner-label">{{ loadingText }}</span>\n</div>`,

  // 20. Progress
  `<div class="progress progress-medium">\n\t<div class="progress-bar progress-primary"\n\t\t [style.width.%]="(value / max) * 100"></div>\n\t<span class="progress-label">{{ (value / max * 100) | number:'1.0-0' }}%</span>\n</div>`,

  // 21. Slider
  `<div class="slider-wrapper">\n\t<input\n\t\ttype="range"\n\t\t[(ngModel)]="value"\n\t\t(ngModelChange)="handleChange($event)"\n\t\t[min]="min"\n\t\t[max]="max"\n\t\t[step]="step"\n\t\tclass="slider"\n\t/>\n\t<span class="slider-value">{{ value }}</span>\n</div>`,

  // 22. Switch
  `<div class="switch-wrapper">\n\t<label class="switch switch-medium">\n\t\t<input\n\t\t\ttype="checkbox"\n\t\t\t[checked]="checked"\n\t\t\t(change)="handleChange($event)"\n\t\t\t[disabled]="disabled"\n\t\t/>\n\t\t<span class="switch-slider"></span>\n\t</label>\n\t<span class="switch-label">{{ label }}</span>\n</div>`,

  // 23. Image
  `<img\n\t[src]="src"\n\t[alt]="alt"\n\t[width]="width"\n\t[height]="height"\n\tclass="responsive-image"\n\tloading="lazy"\n\t(load)="handleLoad()"\n\t(error)="handleError()"\n\t[style.objectFit]="'cover'"\n/>`,

  // 24. Link
  `<a\n\t[href]="href"\n\t(click)="handleClick($event)"\n\ttarget="_blank"\n\trel="noopener noreferrer"\n\tclass="link"\n>\n\t<ng-content></ng-content>\n</a>`,

  // 25. List
  `<ul class="list">\n\t<li *ngFor="let item of items"\n\t\tclass="list-item"\n\t\t(click)="item.onClick && item.onClick($event)">\n\t\t{{ item.content }}\n\t</li>\n</ul>`,

  // 26. Table
  `<table class="table table-striped">\n\t<thead>\n\t\t<tr>\n\t\t\t<th *ngFor="let column of columns" (click)="handleSort(column.key)">\n\t\t\t\t{{ column.title }}\n\t\t\t</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr *ngFor="let row of data; let i = index" (click)="handleRowClick(row)">\n\t\t\t<td *ngFor="let column of columns">\n\t\t\t\t{{ row[column.key] }}\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>`,

  // 27. Pagination
  `<nav class="pagination">\n\t<button (click)="onPageChange(1)" [disabled]="currentPage === 1">First</button>\n\t<button (click)="onPageChange(currentPage - 1)" [disabled]="currentPage === 1">Previous</button>\n\t<span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>\n\t<button (click)="onPageChange(currentPage + 1)" [disabled]="currentPage === totalPages">Next</button>\n\t<button (click)="onPageChange(totalPages)" [disabled]="currentPage === totalPages">Last</button>\n</nav>`,

  // 28. SearchInput
  `<div class="search-input">\n\t<input\n\t\ttype="text"\n\t\t[(ngModel)]="searchValue"\n\t\t(ngModelChange)="handleSearchChange($event)"\n\t\tplaceholder="Search..."\n\t\tclass="search-field"\n\t/>\n\t<button (click)="handleSearch()" class="search-button">Search</button>\n\t<button *ngIf="searchValue" (click)="clearSearch()" class="search-clear">Clear</button>\n</div>`,

  // 29. DatePicker
  `<div class="datepicker">\n\t<input\n\t\ttype="date"\n\t\t[(ngModel)]="selectedDate"\n\t\t(ngModelChange)="handleDateChange($event)"\n\t\t[min]="minDate"\n\t\t[max]="maxDate"\n\t\tclass="datepicker-input"\n\t/>\n\t<button *ngIf="selectedDate" (click)="clearDate()" class="datepicker-clear">Clear</button>\n</div>`,

  // 30. TimePicker
  `<input\n\ttype="time"\n\t[(ngModel)]="selectedTime"\n\t(ngModelChange)="handleTimeChange($event)"\n\tstep="60"\n\tclass="timepicker"\n/>`,

  // 31. ColorPicker
  `<div class="color-picker">\n\t<input\n\t\ttype="color"\n\t\t[(ngModel)]="selectedColor"\n\t\t(ngModelChange)="handleColorChange($event)"\n\t\tclass="color-input"\n\t/>\n\t<div class="color-presets">\n\t\t<button *ngFor="let color of presetColors"\n\t\t\t\tclass="color-preset"\n\t\t\t\t[style.backgroundColor]="color"\n\t\t\t\t(click)="setSelectedColor(color)">\n\t\t</button>\n\t</div>\n</div>`,

  // 32. FileUpload
  `<div class="file-upload">\n\t<input\n\t\ttype="file"\n\t\t(change)="handleFileSelect($event)"\n\t\taccept=".jpg,.png,.pdf"\n\t\tmultiple\n\t\tclass="file-input"\n\t/>\n\t<label class="file-label">Choose Files or Drag & Drop</label>\n</div>`,

  // 33. Rating
  `<div class="rating">\n\t<button *ngFor="let star of [1,2,3,4,5]"\n\t\t\t[class.filled]="rating >= star"\n\t\t\tclass="star"\n\t\t\t(click)="setRating(star)">\n\t\t★\n\t</button>\n</div>`,

  // 34. Tag
  `<span class="tag tag-primary">\n\t{{ tagText }}\n\t<button class="tag-remove" (click)="handleRemove()">×</button>\n</span>`,

  // 35. Chip
  `<div class="chip">\n\t<img *ngIf="avatar" [src]="avatar" alt="" class="chip-avatar" />\n\t<span class="chip-text">{{ text }}</span>\n\t<button *ngIf="removable" class="chip-remove" (click)="onRemove()">×</button>\n</div>`,

  // 36. Stepper
  `<div class="stepper">\n\t<div *ngFor="let step of steps; let i = index"\n\t\t [class.active]="currentStep >= i"\n\t\t class="step">\n\t\t<div class="step-indicator">{{ i + 1 }}</div>\n\t\t<div class="step-content">\n\t\t\t<div class="step-title">{{ step.title }}</div>\n\t\t\t<div class="step-description">{{ step.description }}</div>\n\t\t</div>\n\t</div>\n</div>`,

  // 37. Skeleton
  `<div class="skeleton">\n\t<div class="skeleton-line skeleton-title"></div>\n\t<div class="skeleton-line skeleton-text"></div>\n\t<div class="skeleton-line skeleton-text short"></div>\n</div>`,

  // 38. Empty State
  `<div class="empty-state">\n\t<div class="empty-icon">{{ icon }}</div>\n\t<h3 class="empty-title">{{ title }}</h3>\n\t<p class="empty-description">{{ description }}</p>\n\t<button *ngIf="action" class="empty-action" (click)="action.onClick()">\n\t\t{{ action.text }}\n\t</button>\n</div>`,

  // 39. Grid
  `<div class="grid grid-cols-3 gap-4">\n\t<div *ngFor="let item of items" class="grid-item">\n\t\t{{ item.content }}\n\t</div>\n</div>`,

  // 40. Header
  `<header class="header">\n\t<div class="header-brand">\n\t\t<img [src]="logo" alt="Logo" class="header-logo" />\n\t\t<h1 class="header-title">{{ title }}</h1>\n\t</div>\n\t<nav class="header-nav">\n\t\t<a *ngFor="let item of navItems"\n\t\t\t [href]="item.href"\n\t\t\t class="header-nav-item">\n\t\t\t{{ item.label }}\n\t\t</a>\n\t</nav>\n</header>`,

  // 41. Footer
  `<footer class="footer">\n\t<div class="footer-content">\n\t\t<div class="footer-section">\n\t\t\t<h3 class="footer-title">{{ title }}</h3>\n\t\t\t<p class="footer-text">{{ content }}</p>\n\t\t</div>\n\t\t<div class="footer-links">\n\t\t\t<a *ngFor="let link of links"\n\t\t\t\t [href]="link.href"\n\t\t\t\t class="footer-link">\n\t\t\t\t{{ link.label }}\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\t<div class="footer-bottom">\n\t\t<p>&copy; {{ currentYear }} {{ companyName }}</p>\n\t</div>\n</footer>`,

  // 42. Navbar
  `<nav class="navbar">\n\t<div class="navbar-brand">\n\t\t<a href="/" class="navbar-brand-link">{{ brandName }}</a>\n\t</div>\n\t<div class="navbar-menu">\n\t\t<a *ngFor="let item of menuItems"\n\t\t\t [href]="item.href"\n\t\t\t class="navbar-item">\n\t\t\t{{ item.label }}\n\t\t</a>\n\t</div>\n\t<button class="navbar-toggle" (click)="toggleMenu()">☰</button>\n</nav>`,

  // 43. Toast
  `<div class="toast toast-success">\n\t<div class="toast-icon">{{ icon }}</div>\n\t<div class="toast-content">\n\t\t<div class="toast-title">{{ title }}</div>\n\t\t<div class="toast-message">{{ message }}</div>\n\t</div>\n\t<button class="toast-close" (click)="onClose()">x</button>\n</div>`,

  // 44. Button Group
  `<div class="button-group">\n\t<button *ngFor="let button of buttons; let i = index"\n\t\t\t [class.active]="button.active"\n\t\t\t class="button"\n\t\t\t (click)="button.onClick()">\n\t\t{{ button.label }}\n\t</button>\n</div>`,

  // 45. Form Group
  `<div class="form-group">\n\t<label class="form-label" [for]="inputId">\n\t\t{{ label }}\n\t\t<span *ngIf="required" class="required">*</span>\n\t</label>\n\t<input\n\t\t[id]="inputId"\n\t\t[type]="inputType"\n\t\t[(ngModel)]="value"\n\t\t(ngModelChange)="handleChange($event)"\n\t\tclass="form-input"\n\t\t[required]="required"\n\t/>\n\t<span *ngIf="error" class="form-error">{{ error }}</span>\n\t<span *ngIf="helperText" class="form-helper">{{ helperText }}</span>\n</div>`,

  // 46. Radio Group
  `<div class="radio-group">\n\t<div class="radio-group-label">{{ label }}</div>\n\t<div *ngFor="let option of options" class="radio-option">\n\t\t<input\n\t\t\ttype="radio"\n\t\t\t[id]="option.value"\n\t\t\t[name]="name"\n\t\t\t[value]="option.value"\n\t\t\t[checked]="selectedValue === option.value"\n\t\t\t(change)="handleChange(option.value)"\n\t\t/>\n\t\t<label [for]="option.value">{{ option.label }}</label>\n\t</div>\n</div>`,

  // 47. Number Input
  `<div class="number-input">\n\t<button\n\t\tclass="number-input-decrease"\n\t\t(click)="setValue(value - step)"\n\t\t[disabled]="value <= min"\n\t>-</button>\n\t<input\n\t\ttype="number"\n\t\t[(ngModel)]="value"\n\t\t(ngModelChange)="handleChange($event)"\n\t\t[min]="min"\n\t\t[max]="max"\n\t\t[step]="step"\n\t\tclass="number-input-field"\n\t/>\n\t<button\n\t\tclass="number-input-increase"\n\t\t(click)="setValue(value + step)"\n\t\t[disabled]="value >= max"\n\t>+</button>\n</div>`,

  // 48. Loading Button
  `<button class="button loading" [disabled]="isLoading" (click)="handleClick()">\n\t<span *ngIf="isLoading" class="button-spinner"></span>\n\t{{ isLoading ? loadingText : buttonText }}\n</button>`,

  // 49. Icon Button
  `<button class="icon-button" (click)="handleClick()" [attr.aria-label]="ariaLabel">\n\t<span class="icon">{{ icon }}</span>\n</button>`,

  // 50. Multi Select
  `<div class="multi-select">\n\t<div class="multi-select-control" (click)="toggleDropdown()">\n\t\t<div class="multi-select-value">\n\t\t\t{{ selectedItems.length > 0 ? (selectedItems.length + ' selected') : placeholder }}\n\t\t</div>\n\t\t<span class="multi-select-arrow">▼</span>\n\t</div>\n\t<div *ngIf="isOpen" class="multi-select-dropdown">\n\t\t<div *ngFor="let option of options"\n\t\t\t\tclass="multi-select-option"\n\t\t\t\t(click)="toggleOption(option.value)">\n\t\t\t<input\n\t\t\t\ttype="checkbox"\n\t\t\t\t[checked]="selectedItems.includes(option.value)"\n\t\t\t\treadonly\n\t\t\t/>\n\t\t\t{{ option.label }}\n\t\t</div>\n\t</div>\n</div>`,
];
