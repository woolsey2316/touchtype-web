export const REACT_WORDS = [
  // 1. Button
  `<button onClick={handleClick} disabled={disabled} type="submit" className="btn-primary">\n\t{children}\n</button>`,

  // 2. Input
  `<input\n\tvalue={value}\n\tonChange={handleChange}\n\tplaceholder="Enter text"\n\ttype="text"\n\tdisabled={disabled}\n\trequired={required}\n\tname="inputName"\n\tclassName="form-input"\n/>`,

  // 3. Label
  `<label htmlFor="inputId" className="form-label" required={required}>\n\t{labelText}\n</label>`,

  // 4. TextArea
  `<textarea\n\tvalue={value}\n\tonChange={handleChange}\n\tplaceholder="Enter message"\n\trows={4}\n\tcols={50}\n\tdisabled={disabled}\n\tclassName="form-textarea"\n\tmaxLength={500}\n/>`,

  // 5. Select
  `<select value={selectedValue} onChange={handleChange} disabled={disabled} className="form-select">\n\t<option value="">Choose option</option>\n\t{options.map(option =>\n\t\t<option key={option.value} value={option.value}>{option.label}</option>\n\t)}\n</select>`,

  // 6. Checkbox
  `<div className="checkbox-wrapper">\n\t<input\n\t\ttype="checkbox"\n\t\tchecked={checked}\n\t\tonChange={handleChange}\n\t\tdisabled={disabled}\n\t\tid="checkbox1"\n\t\tvalue="checkboxValue"\n\t/>\n\t<label htmlFor="checkbox1">{label}</label>\n</div>`,

  // 7. Radio
  `<div className="radio-wrapper">\n\t<input\n\t\ttype="radio"\n\t\tchecked={checked}\n\t\tonChange={handleChange}\n\t\tname="radioGroup"\n\t\tvalue="radioValue"\n\t\tid="radio1"\n\t/>\n\t<label htmlFor="radio1">{label}</label>\n</div>`,

  // 8. Form
  `<form onSubmit={handleSubmit} className="form" noValidate={false} autoComplete="on">\n\t{children}\n</form>`,

  // 9. Modal
  `<div className={isOpen ? "modal-overlay active" : "modal-overlay"}>\n\t<div className="modal-content">\n\t\t<div className="modal-header">\n\t\t\t<h2>{title}</h2>\n\t\t\t<button onClick={onClose} className="modal-close">&times;</button>\n\t\t</div>\n\t\t<div className="modal-body">{children}</div>\n\t</div>\n</div>`,

  // 10. Card
  `<div className="card" onClick={handleClick}>\n\t<div className="card-header">\n\t\t<h3 className="card-title">{title}</h3>\n\t\t<p className="card-subtitle">{subtitle}</p>\n\t</div>\n\t<div className="card-body">{children}</div>\n\t<div className="card-footer">{footer}</div>\n</div>`,

  // 11. Avatar
  `<div className="avatar avatar-medium avatar-circle" onClick={handleClick}>\n\t{src ? <img src={src} alt={alt} /> : <span className="avatar-fallback">{initials}</span>}\n</div>`,

  // 12. Badge
  `<span className="badge badge-primary badge-medium" onClick={handleClick}>\n\t{children}\n</span>`,

  // 13. Alert
  `<div className="alert alert-info">\n\t<h4 className="alert-title">{title}</h4>\n\t<div className="alert-message">{children}</div>\n\t<button className="alert-dismiss" onClick={onDismiss}>&times;</button>\n</div>`,

  // 14. Breadcrumb
  `<nav className="breadcrumb">\n\t{items.map((item, index) => (\n\t\t<span key={index} className="breadcrumb-item">\n\t\t\t<a href={item.href} onClick={item.onClick}>{item.label}</a>\n\t\t\t{index < items.length - 1 && <span className="breadcrumb-separator">/</span>}\n\t\t</span>\n\t))}\n</nav>`,

  // 15. Dropdown
  `<div className="dropdown">\n\t<button className="dropdown-trigger" onClick={toggleDropdown}>\n\t\t{triggerText}\n\t</button>\n\t{isOpen && (\n\t\t<div className="dropdown-menu">\n\t\t\t{options.map((option, index) => (\n\t\t\t\t<div key={index} className="dropdown-item" onClick={option.onClick}>\n\t\t\t\t\t{option.label}\n\t\t\t\t</div>\n\t\t\t))}\n\t\t</div>\n\t)}\n</div>`,

  // 16. Tabs
  `<div className="tabs">\n\t<div className="tab-list">\n\t\t{tabs.map(tab => (\n\t\t\t<button\n\t\t\t\tkey={tab.id}\n\t\t\t\tclassName={activeTab === tab.id ? "tab-button active" : "tab-button"}\n\t\t\t\tonClick={() => setActiveTab(tab.id)}\n\t\t\t>\n\t\t\t\t{tab.label}\n\t\t\t</button>\n\t\t))}\n\t</div>\n\t<div className="tab-content">\n\t\t{tabs.find(tab => tab.id === activeTab)?.content}\n\t</div>\n</div>`,

  // 17. Accordion
  `<div className="accordion">\n\t{items.map(item => (\n\t\t<div key={item.id} className="accordion-item">\n\t\t\t<button\n\t\t\t\tclassName="accordion-header"\n\t\t\t\tonClick={() => toggleItem(item.id)}\n\t\t\t>\n\t\t\t\t{item.title}\n\t\t\t</button>\n\t\t\t{openItems.includes(item.id) && (\n\t\t\t\t<div className="accordion-content">{item.content}</div>\n\t\t\t)}\n\t\t</div>\n\t))}\n</div>`,

  // 18. Tooltip
  `<div className="tooltip-wrapper">\n\t{children}\n\t<div className="tooltip tooltip-top">\n\t\t{tooltipContent}\n\t</div>\n</div>`,

  // 19. Spinner
  `<div className="spinner spinner-medium">\n\t<div className="spinner-circle" />\n\t<span className="spinner-label">{loadingText}</span>\n</div>`,

  // 20. Progress
  `<div className="progress progress-medium">\n\t<div\n\t\tclassName="progress-bar progress-primary"\n\t\tstyle={{ width: \`\${(value / max) * 100}%\` }}\n\t/>\n\t<span className="progress-label">{\`\${Math.round((value / max) * 100)}%\`}</span>\n</div>`,

  // 21. Slider
  `<div className="slider-wrapper">\n\t<input\n\t\ttype="range"\n\t\tvalue={value}\n\t\tonChange={handleChange}\n\t\tmin={min}\n\t\tmax={max}\n\t\tstep={step}\n\t\tclassName="slider"\n\t/>\n\t<span className="slider-value">{value}</span>\n</div>`,

  // 22. Switch
  `<div className="switch-wrapper">\n\t<label className="switch switch-medium">\n\t\t<input\n\t\t\ttype="checkbox"\n\t\t\tchecked={checked}\n\t\t\tonChange={handleChange}\n\t\t\tdisabled={disabled}\n\t\t/>\n\t\t<span className="switch-slider" />\n\t</label>\n\t<span className="switch-label">{label}</span>\n</div>`,

  // 23. Image
  `<img\n\tsrc={src}\n\talt={alt}\n\twidth={width}\n\theight={height}\n\tclassName="responsive-image"\n\tloading="lazy"\n\tonLoad={handleLoad}\n\tonError={handleError}\n\tstyle={{ objectFit: 'cover' }}\n/>`,

  // 24. Link
  `<a\n\thref={href}\n\tonClick={handleClick}\n\ttarget="_blank"\n\trel="noopener noreferrer"\n\tclassName="link"\n>\n\t{children}\n</a>`,

  // 25. List
  `<ul className="list">\n\t{items.map(item => (\n\t\t<li key={item.id} className="list-item" onClick={item.onClick}>\n\t\t\t{item.content}\n\t\t</li>\n\t))}\n</ul>`,

  // 26. Table
  `<table className="table table-striped">\n\t<thead>\n\t\t<tr>\n\t\t\t{columns.map(column => (\n\t\t\t\t<th key={column.key} onClick={() => handleSort(column.key)}>\n\t\t\t\t\t{column.title}\n\t\t\t\t</th>\n\t\t\t))}\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t{data.map((row, index) => (\n\t\t\t<tr key={index} onClick={() => handleRowClick(row)}>\n\t\t\t\t{columns.map(column => (\n\t\t\t\t\t<td key={column.key}>{row[column.key]}</td>\n\t\t\t\t))}\n\t\t\t</tr>\n\t\t))}\n\t</tbody>\n</table>`,

  // 27. Pagination
  `<nav className="pagination">\n\t<button onClick={() => onPageChange(1)} disabled={currentPage === 1}>\n\t\tFirst\n\t</button>\n\t<button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>\n\t\tPrevious\n\t</button>\n\t<span className="page-info">Page {currentPage} of {totalPages}</span>\n\t<button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>\n\t\tNext\n\t</button>\n\t<button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>\n\t\tLast\n\t</button>\n</nav>`,

  // 28. SearchInput
  `<div className="search-input">\n\t<input\n\t\ttype="text"\n\t\tvalue={searchValue}\n\t\tonChange={handleSearchChange}\n\t\tplaceholder="Search..."\n\t\tclassName="search-field"\n\t/>\n\t<button onClick={handleSearch} className="search-button">\n\t\tSearch\n\t</button>\n\t{searchValue && (\n\t\t<button onClick={clearSearch} className="search-clear">\n\t\t\tClear\n\t\t</button>\n\t)}\n</div>`,

  // 29. DatePicker
  `<div className="datepicker">\n\t<input\n\t\ttype="date"\n\t\tvalue={selectedDate}\n\t\tonChange={handleDateChange}\n\t\tmin={minDate}\n\t\tmax={maxDate}\n\t\tclassName="datepicker-input"\n\t/>\n\t{selectedDate && (\n\t\t<button onClick={clearDate} className="datepicker-clear">\n\t\t\tClear\n\t\t</button>\n\t)}\n</div>`,

  // 30. TimePicker
  `<input\n\ttype="time"\n\tvalue={selectedTime}\n\tonChange={handleTimeChange}\n\tstep="60"\n\tclassName="timepicker"\n/>`,

  // 31. ColorPicker
  `<div className="color-picker">\n\t<input\n\t\ttype="color"\n\t\tvalue={selectedColor}\n\t\tonChange={handleColorChange}\n\t\tclassName="color-input"\n\t/>\n\t<div className="color-presets">\n\t\t{presetColors.map(color => (\n\t\t\t<button\n\t\t\t\tkey={color}\n\t\t\t\tclassName="color-preset"\n\t\t\t\tstyle={{ backgroundColor: color }}\n\t\t\t\tonClick={() => setSelectedColor(color)}\n\t\t\t/>\n\t\t))}\n\t</div>\n</div>`,

  // 32. FileUpload
  `<div className="file-upload">\n\t<input\n\t\ttype="file"\n\t\tonChange={handleFileSelect}\n\t\taccept=".jpg,.png,.pdf"\n\t\tmultiple={true}\n\t\tclassName="file-input"\n\t/>\n\t<label className="file-label">\n\t\tChoose Files or Drag & Drop\n\t</label>\n</div>`,

  // 33. Rating
  `<div className="rating">\n\t{[1, 2, 3, 4, 5].map(star => (\n\t\t<button\n\t\t\tkey={star}\n\t\t\tclassName={rating >= star ? "star filled" : "star"}\n\t\t\tonClick={() => setRating(star)}\n\t\t>\n\t\t\t★\n\t\t</button>\n\t))}\n</div>`,

  // 34. Tag
  `<span className="tag tag-primary">\n\t{tagText}\n\t<button className="tag-remove" onClick={handleRemove}>\n\t\t×\n\t</button>\n</span>`,

  // 35. Chip
  `<div className="chip">\n\t{avatar && <img src={avatar} alt="" className="chip-avatar" />}\n\t<span className="chip-text">{text}</span>\n\t{removable && (\n\t\t<button className="chip-remove" onClick={onRemove}>\n\t\t\t×\n\t\t</button>\n\t)}\n</div>`,

  // 36. Stepper
  `<div className="stepper">\n\t{steps.map((step, index) => (\n\t\t<div key={index} className={currentStep >= index ? "step active" : "step"}>\n\t\t\t<div className="step-indicator">{index + 1}</div>\n\t\t\t<div className="step-content">\n\t\t\t\t<div className="step-title">{step.title}</div>\n\t\t\t\t<div className="step-description">{step.description}</div>\n\t\t\t</div>\n\t\t</div>\n\t))}\n</div>`,

  // 37. Skeleton
  `<div className="skeleton">\n\t<div className="skeleton-line skeleton-title"></div>\n\t<div className="skeleton-line skeleton-text"></div>\n\t<div className="skeleton-line skeleton-text short"></div>\n</div>`,

  // 38. Empty State
  `<div className="empty-state">\n\t<div className="empty-icon">{icon}</div>\n\t<h3 className="empty-title">{title}</h3>\n\t<p className="empty-description">{description}</p>\n\t{action && (\n\t\t<button className="empty-action" onClick={action.onClick}>\n\t\t\t{action.text}\n\t\t</button>\n\t)}\n</div>`,

  // 39. Grid
  `<div className="grid grid-cols-3 gap-4">\n\t{items.map(item => (\n\t\t<div key={item.id} className="grid-item">\n\t\t\t{item.content}\n\t\t</div>\n\t))}\n</div>`,

  // 40. Header
  `<header className="header">\n\t<div className="header-brand">\n\t\t<img src={logo} alt="Logo" className="header-logo" />\n\t\t<h1 className="header-title">{title}</h1>\n\t</div>\n\t<nav className="header-nav">\n\t\t{navItems.map(item => (\n\t\t\t<a key={item.id} href={item.href} className="header-nav-item">\n\t\t\t\t{item.label}\n\t\t\t</a>\n\t\t))}\n\t</nav>\n</header>`,

  // 41. Footer
  `<footer className="footer">\n\t<div className="footer-content">\n\t\t<div className="footer-section">\n\t\t\t<h3 className="footer-title">{title}</h3>\n\t\t\t<p className="footer-text">{content}</p>\n\t\t</div>\n\t\t<div className="footer-links">\n\t\t\t{links.map(link => (\n\t\t\t\t<a key={link.id} href={link.href} className="footer-link">\n\t\t\t\t\t{link.label}\n\t\t\t\t</a>\n\t\t\t))}\n\t\t</div>\n\t</div>\n\t<div className="footer-bottom">\n\t\t<p>&copy; {new Date().getFullYear()} {companyName}</p>\n\t</div>\n</footer>`,

  // 42. Navbar
  `<nav className="navbar">\n\t<div className="navbar-brand">\n\t\t<a href="/" className="navbar-brand-link">{brandName}</a>\n\t</div>\n\t<div className="navbar-menu">\n\t\t{menuItems.map(item => (\n\t\t\t<a key={item.id} href={item.href} className="navbar-item">\n\t\t\t\t{item.label}\n\t\t\t</a>\n\t\t))}\n\t</div>\n\t<button className="navbar-toggle" onClick={toggleMenu}>\n\t\t☰\n\t</button>\n</nav>`,

  // 43. Toast
  `<div className="toast toast-success">\n\t<div className="toast-icon">{icon}</div>\n\t<div className="toast-content">\n\t\t<div className="toast-title">{title}</div>\n\t\t<div className="toast-message">{message}</div>\n\t</div>\n\t<button className="toast-close" onClick={onClose}>×</button>\n</div>`,

  // 44. Button Group
  `<div className="button-group">\n\t{buttons.map((button, index) => (\n\t\t<button\n\t\t\tkey={index}\n\t\t\tclassName={button.active ? "button active" : "button"}\n\t\t\tonClick={button.onClick}\n\t\t>\n\t\t\t{button.label}\n\t\t</button>\n\t))}\n</div>`,

  // 45. Form Group
  `<div className="form-group">\n\t<label className="form-label" htmlFor={inputId}>\n\t\t{label}\n\t\t{required && <span className="required">*</span>}\n\t</label>\n\t<input\n\t\tid={inputId}\n\t\ttype={inputType}\n\t\tvalue={value}\n\t\tonChange={handleChange}\n\t\tclassName="form-input"\n\t\trequired={required}\n\t/>\n\t{error && <span className="form-error">{error}</span>}\n\t{helperText && <span className="form-helper">{helperText}</span>}\n</div>`,

  // 46. Radio Group
  `<div className="radio-group">\n\t<div className="radio-group-label">{label}</div>\n\t{options.map(option => (\n\t\t<div key={option.value} className="radio-option">\n\t\t\t<input\n\t\t\t\ttype="radio"\n\t\t\t\tid={option.value}\n\t\t\t\tname={name}\n\t\t\t\tvalue={option.value}\n\t\t\t\tchecked={selectedValue === option.value}\n\t\t\t\tonChange={handleChange}\n\t\t\t/>\n\t\t\t<label htmlFor={option.value}>{option.label}</label>\n\t\t</div>\n\t))}\n</div>`,

  // 47. Number Input
  `<div className="number-input">\n\t<button\n\t\tclassName="number-input-decrease"\n\t\tonClick={() => setValue(value - step)}\n\t\tdisabled={value <= min}\n\t>\n\t\t-\n\t</button>\n\t<input\n\t\ttype="number"\n\t\tvalue={value}\n\t\tonChange={handleChange}\n\t\tmin={min}\n\t\tmax={max}\n\t\tstep={step}\n\t\tclassName="number-input-field"\n\t/>\n\t<button\n\t\tclassName="number-input-increase"\n\t\tonClick={() => setValue(value + step)}\n\t\tdisabled={value >= max}\n\t>\n\t\t+\n\t</button>\n</div>`,

  // 48. Loading Button
  `<button className="button loading" disabled={isLoading} onClick={handleClick}>\n\t{isLoading && <span className="button-spinner"></span>}\n\t{isLoading ? loadingText : buttonText}\n</button>`,

  // 49. Icon Button
  `<button className="icon-button" onClick={handleClick} aria-label={ariaLabel}>\n\t<span className="icon">{icon}</span>\n</button>`,

  // 50. Multi Select
  `<div className="multi-select">\n\t<div className="multi-select-control" onClick={toggleDropdown}>\n\t\t<div className="multi-select-value">\n\t\t\t{selectedItems.length > 0 ? \`\${selectedItems.length} selected\` : placeholder}\n\t\t</div>\n\t\t<span className="multi-select-arrow">▼</span>\n\t</div>\n\t{isOpen && (\n\t\t<div className="multi-select-dropdown">\n\t\t\t{options.map(option => (\n\t\t\t\t<div\n\t\t\t\t\tkey={option.value}\n\t\t\t\t\tclassName="multi-select-option"\n\t\t\t\t\tonClick={() => toggleOption(option.value)}\n\t\t\t\t>\n\t\t\t\t\t<input\n\t\t\t\t\t\ttype="checkbox"\n\t\t\t\t\t\tchecked={selectedItems.includes(option.value)}\n\t\t\t\t\t\treadOnly\n\t\t\t\t\t/>\n\t\t\t\t\t{option.label}\n\t\t\t\t</div>\n\t\t\t))}\n\t\t</div>\n\t)}\n</div>`,
];
