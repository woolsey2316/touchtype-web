export const REACT_WORDS = [
  // 1. Button
  `<button onClick={handleClick} disabled={disabled} type="submit" className="btn-primary">↵→{children}↵</button>`,

  // 2. Input
  `<input↵→value={value}↵→onChange={handleChange}↵→placeholder="Enter text"↵→type="text"↵→disabled={disabled}↵→required={required}↵→name="inputName"↵→className="form-input"↵/>`,

  // 3. Label
  `<label htmlFor="inputId" className="form-label" required={required}>↵→{labelText}↵</label>`,

  // 4. TextArea
  `<textarea↵→value={value}↵→onChange={handleChange}↵→placeholder="Enter message"↵→rows={4}↵→cols={50}↵→disabled={disabled}↵→className="form-textarea"↵→maxLength={500}↵/>`,

  // 5. Select
  `<select value={selectedValue} onChange={handleChange} disabled={disabled} className="form-select">↵→<option value="">Choose option</option>↵→{options.map(option =>↵→→<option key={option.value} value={option.value}>{option.label}</option>↵→)}↵</select>`,

  // 6. Checkbox
  `<div className="checkbox-wrapper">↵→<input↵→→type="checkbox"↵→→checked={checked}↵→→onChange={handleChange}↵→→disabled={disabled}↵→→id="checkbox1"↵→→value="checkboxValue"↵→/>↵→<label htmlFor="checkbox1">{label}</label>↵</div>`,

  // 7. Radio
  `<div className="radio-wrapper">↵→<input↵→→type="radio"↵→→checked={checked}↵→→onChange={handleChange}↵→→name="radioGroup"↵→→value="radioValue"↵→→id="radio1"↵→/>↵→<label htmlFor="radio1">{label}</label>↵</div>`,

  // 8. Form
  `<form onSubmit={handleSubmit} className="form" noValidate={false} autoComplete="on">↵→{children}↵</form>`,

  // 9. Modal
  `<div className={isOpen ? "modal-overlay active" : "modal-overlay"}>↵→<div className="modal-content">↵→→<div className="modal-header">↵→→→<h2>{title}</h2>↵→→→<button onClick={onClose} className="modal-close">&times;</button>↵→→</div>↵→→<div className="modal-body">{children}</div>↵→</div>↵</div>`,

  // 10. Card
  `<div className="card" onClick={handleClick}>↵→<div className="card-header">↵→→<h3 className="card-title">{title}</h3>↵→→<p className="card-subtitle">{subtitle}</p>↵→</div>↵→<div className="card-body">{children}</div>↵→<div className="card-footer">{footer}</div>↵</div>`,

  // 11. Avatar
  `<div className="avatar avatar-medium avatar-circle" onClick={handleClick}>↵→{src ? <img src={src} alt={alt} /> : <span className="avatar-fallback">{initials}</span>}↵</div>`,

  // 12. Badge
  `<span className="badge badge-primary badge-medium" onClick={handleClick}>↵→{children}↵</span>`,

  // 13. Alert
  `<div className="alert alert-info">↵→<h4 className="alert-title">{title}</h4>↵→<div className="alert-message">{children}</div>↵→<button className="alert-dismiss" onClick={onDismiss}>&times;</button>↵</div>`,

  // 14. Breadcrumb
  `<nav className="breadcrumb">↵→{items.map((item, index) => (↵→→<span key={index} className="breadcrumb-item">↵→→→<a href={item.href} onClick={item.onClick}>{item.label}</a>↵→→→{index < items.length - 1 && <span className="breadcrumb-separator">/</span>}↵→→</span>↵→))}↵</nav>`,

  // 15. Dropdown
  `<div className="dropdown">↵→<button className="dropdown-trigger" onClick={toggleDropdown}>↵→→{triggerText}↵→</button>↵→{isOpen && (↵→→<div className="dropdown-menu">↵→→→{options.map((option, index) => (↵→→→→<div key={index} className="dropdown-item" onClick={option.onClick}>↵→→→→→{option.label}↵→→→→</div>↵→→→))}↵→→</div>↵→)}↵</div>`,

  // 16. Tabs
  `<div className="tabs">↵→<div className="tab-list">↵→→{tabs.map(tab => (↵→→→<button↵→→→→key={tab.id}↵→→→→className={activeTab === tab.id ? "tab-button active" : "tab-button"}↵→→→→onClick={() => setActiveTab(tab.id)}↵→→→>↵→→→→{tab.label}↵→→→</button>↵→→))}↵→</div>↵→<div className="tab-content">↵→→{tabs.find(tab => tab.id === activeTab)?.content}↵→</div>↵</div>`,

  // 17. Accordion
  `<div className="accordion">↵→{items.map(item => (↵→→<div key={item.id} className="accordion-item">↵→→→<button↵→→→→className="accordion-header"↵→→→→onClick={() => toggleItem(item.id)}↵→→→>↵→→→→{item.title}↵→→→</button>↵→→→{openItems.includes(item.id) && (↵→→→→<div className="accordion-content">{item.content}</div>↵→→→)}↵→→</div>↵→))}↵</div>`,

  // 18. Tooltip
  `<div className="tooltip-wrapper">↵→{children}↵→<div className="tooltip tooltip-top">↵→→{tooltipContent}↵→</div>↵</div>`,

  // 19. Spinner
  `<div className="spinner spinner-medium">↵→<div className="spinner-circle" />↵→<span className="spinner-label">{loadingText}</span>↵</div>`,

  // 20. Progress
  `<div className="progress progress-medium">↵→<div↵→→className="progress-bar progress-primary"↵→→style={{ width: \`\${(value / max) * 100}%\` }}↵→/>↵→<span className="progress-label">{\`\${Math.round((value / max) * 100)}%\`}</span>↵</div>`,

  // 21. Slider
  `<div className="slider-wrapper">↵→<input↵→→type="range"↵→→value={value}↵→→onChange={handleChange}↵→→min={min}↵→→max={max}↵→→step={step}↵→→className="slider"↵→/>↵→<span className="slider-value">{value}</span>↵</div>`,

  // 22. Switch
  `<div className="switch-wrapper">↵→<label className="switch switch-medium">↵→→<input↵→→→type="checkbox"↵→→→checked={checked}↵→→→onChange={handleChange}↵→→→disabled={disabled}↵→→/>↵→→<span className="switch-slider" />↵→</label>↵→<span className="switch-label">{label}</span>↵</div>`,

  // 23. Image
  `<img↵→src={src}↵→alt={alt}↵→width={width}↵→height={height}↵→className="responsive-image"↵→loading="lazy"↵→onLoad={handleLoad}↵→onError={handleError}↵→style={{ objectFit: 'cover' }}↵/>`,

  // 24. Link
  `<a↵→href={href}↵→onClick={handleClick}↵→target="_blank"↵→rel="noopener noreferrer"↵→className="link"↵>↵→{children}↵</a>`,

  // 25. List
  `<ul className="list">↵→{items.map(item => (↵→→<li key={item.id} className="list-item" onClick={item.onClick}>↵→→→{item.content}↵→→</li>↵→))}↵</ul>`,

  // 26. Table
  `<table className="table table-striped">↵→<thead>↵→→<tr>↵→→→{columns.map(column => (↵→→→→<th key={column.key} onClick={() => handleSort(column.key)}>↵→→→→→{column.title}↵→→→→</th>↵→→→))}↵→→</tr>↵→</thead>↵→<tbody>↵→→{data.map((row, index) => (↵→→→<tr key={index} onClick={() => handleRowClick(row)}>↵→→→→{columns.map(column => (↵→→→→→<td key={column.key}>{row[column.key]}</td>↵→→→→))}↵→→→</tr>↵→→))}↵→</tbody>↵</table>`,

  // 27. Pagination
  `<nav className="pagination">↵→<button onClick={() => onPageChange(1)} disabled={currentPage === 1}>↵→→First↵→</button>↵→<button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>↵→→Previous↵→</button>↵→<span className="page-info">Page {currentPage} of {totalPages}</span>↵→<button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>↵→→Next↵→</button>↵→<button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>↵→→Last↵→</button>↵</nav>`,

  // 28. SearchInput
  `<div className="search-input">↵→<input↵→→type="text"↵→→value={searchValue}↵→→onChange={handleSearchChange}↵→→placeholder="Search..."↵→→className="search-field"↵→/>↵→<button onClick={handleSearch} className="search-button">↵→→Search↵→</button>↵→{searchValue && (↵→→<button onClick={clearSearch} className="search-clear">↵→→→Clear↵→→</button>↵→)}↵</div>`,

  // 29. DatePicker
  `<div className="datepicker">↵→<input↵→→type="date"↵→→value={selectedDate}↵→→onChange={handleDateChange}↵→→min={minDate}↵→→max={maxDate}↵→→className="datepicker-input"↵→/>↵→{selectedDate && (↵→→<button onClick={clearDate} className="datepicker-clear">↵→→→Clear↵→→</button>↵→)}↵</div>`,

  // 30. TimePicker
  `<input↵→type="time"↵→value={selectedTime}↵→onChange={handleTimeChange}↵→step="60"↵→className="timepicker"↵/>`,

  // 31. ColorPicker
  `<div className="color-picker">↵→<input↵→→type="color"↵→→value={selectedColor}↵→→onChange={handleColorChange}↵→→className="color-input"↵→/>↵→<div className="color-presets">↵→→{presetColors.map(color => (↵→→→<button↵→→→→key={color}↵→→→→className="color-preset"↵→→→→style={{ backgroundColor: color }}↵→→→→onClick={() => setSelectedColor(color)}↵→→→/>↵→→))}↵→</div>↵</div>`,

  // 32. FileUpload
  `<div className="file-upload">↵→<input↵→→type="file"↵→→onChange={handleFileSelect}↵→→accept=".jpg,.png,.pdf"↵→→multiple={true}↵→→className="file-input"↵→/>↵→<label className="file-label">↵→→Choose Files or Drag & Drop↵→</label>↵</div>`,

  // 33. Rating
  `<div className="rating">↵→{[1, 2, 3, 4, 5].map(star => (↵→→<button↵→→→key={star}↵→→→className={rating >= star ? "star filled" : "star"}↵→→→onClick={() => setRating(star)}↵→→>↵→→→★↵→→</button>↵→))}↵</div>`,

  // 34. Tag
  `<span className="tag tag-primary">↵→{tagText}↵→<button className="tag-remove" onClick={handleRemove}>↵→→×↵→</button>↵</span>`,

  // 35. Chip
  `<div className="chip">↵→{avatar && <img src={avatar} alt="" className="chip-avatar" />}↵→<span className="chip-text">{text}</span>↵→{removable && (↵→→<button className="chip-remove" onClick={onRemove}>↵→→→×↵→→</button>↵→)}↵</div>`,

  // 36. Stepper
  `<div className="stepper">↵→{steps.map((step, index) => (↵→→<div key={index} className={currentStep >= index ? "step active" : "step"}>↵→→→<div className="step-indicator">{index + 1}</div>↵→→→<div className="step-content">↵→→→→<div className="step-title">{step.title}</div>↵→→→→<div className="step-description">{step.description}</div>↵→→→</div>↵→→</div>↵→))}↵</div>`,

  // 37. Skeleton
  `<div className="skeleton">↵→<div className="skeleton-line skeleton-title"></div>↵→<div className="skeleton-line skeleton-text"></div>↵→<div className="skeleton-line skeleton-text short"></div>↵</div>`,

  // 38. Empty State
  `<div className="empty-state">↵→<div className="empty-icon">{icon}</div>↵→<h3 className="empty-title">{title}</h3>↵→<p className="empty-description">{description}</p>↵→{action && (↵→→<button className="empty-action" onClick={action.onClick}>↵→→→{action.text}↵→→</button>↵→)}↵</div>`,

  // 39. Grid
  `<div className="grid grid-cols-3 gap-4">↵→{items.map(item => (↵→→<div key={item.id} className="grid-item">↵→→→{item.content}↵→→</div>↵→))}↵</div>`,

  // 40. Header
  `<header className="header">↵→<div className="header-brand">↵→→<img src={logo} alt="Logo" className="header-logo" />↵→→<h1 className="header-title">{title}</h1>↵→</div>↵→<nav className="header-nav">↵→→{navItems.map(item => (↵→→→<a key={item.id} href={item.href} className="header-nav-item">↵→→→→{item.label}↵→→→</a>↵→→))}↵→</nav>↵</header>`,

  // 41. Footer
  `<footer className="footer">↵→<div className="footer-content">↵→→<div className="footer-section">↵→→→<h3 className="footer-title">{title}</h3>↵→→→<p className="footer-text">{content}</p>↵→→</div>↵→→<div className="footer-links">↵→→→{links.map(link => (↵→→→→<a key={link.id} href={link.href} className="footer-link">↵→→→→→{link.label}↵→→→→</a>↵→→→))}↵→→</div>↵→</div>↵→<div className="footer-bottom">↵→→<p>&copy; {new Date().getFullYear()} {companyName}</p>↵→</div>↵</footer>`,

  // 42. Navbar
  `<nav className="navbar">↵→<div className="navbar-brand">↵→→<a href="/" className="navbar-brand-link">{brandName}</a>↵→</div>↵→<div className="navbar-menu">↵→→{menuItems.map(item => (↵→→→<a key={item.id} href={item.href} className="navbar-item">↵→→→→{item.label}↵→→→</a>↵→→))}↵→</div>↵→<button className="navbar-toggle" onClick={toggleMenu}>↵→→{navIcon}↵→</button>↵</nav>`,

  // 43. Toast
  `<div className="toast toast-success">↵→<div className="toast-icon">{icon}</div>↵→<div className="toast-content">↵→→<div className="toast-title">{title}</div>↵→→<div className="toast-message">{message}</div>↵→</div>↵→<button className="toast-close" onClick={onClose}>x</button>↵</div>`,

  // 44. Button Group
  `<div className="button-group">↵→{buttons.map((button, index) => (↵→→<button↵→→→key={index}↵→→→className={button.active ? "button active" : "button"}↵→→→onClick={button.onClick}↵→→>↵→→→{button.label}↵→→</button>↵→))}↵</div>`,

  // 45. Form Group
  `<div className="form-group">↵→<label className="form-label" htmlFor={inputId}>↵→→{label}↵→→{required && <span className="required">*</span>}↵→</label>↵→<input↵→→id={inputId}↵→→type={inputType}↵→→value={value}↵→→onChange={handleChange}↵→→className="form-input"↵→→required={required}↵→/>↵→{error && <span className="form-error">{error}</span>}↵→{helperText && <span className="form-helper">{helperText}</span>}↵</div>`,

  // 46. Radio Group
  `<div className="radio-group">↵→<div className="radio-group-label">{label}</div>↵→{options.map(option => (↵→→<div key={option.value} className="radio-option">↵→→→<input↵→→→→type="radio"↵→→→→id={option.value}↵→→→→name={name}↵→→→→value={option.value}↵→→→→checked={selectedValue === option.value}↵→→→→onChange={handleChange}↵→→→/>↵→→→<label htmlFor={option.value}>{option.label}</label>↵→→</div>↵→))}↵</div>`,

  // 47. Number Input
  `<div className="number-input">↵→<button↵→→className="number-input-decrease"↵→→onClick={() => setValue(value - step)}↵→→disabled={value <= min}↵→>↵→→-↵→</button>↵→<input↵→→type="number"↵→→value={value}↵→→onChange={handleChange}↵→→min={min}↵→→max={max}↵→→step={step}↵→→className="number-input-field"↵→/>↵→<button↵→→className="number-input-increase"↵→→onClick={() => setValue(value + step)}↵→→disabled={value >= max}↵→>↵→→+↵→</button>↵</div>`,

  // 48. Loading Button
  `<button className="button loading" disabled={isLoading} onClick={handleClick}>↵→{isLoading && <span className="button-spinner"></span>}↵→{isLoading ? loadingText : buttonText}↵</button>`,

  // 49. Icon Button
  `<button className="icon-button" onClick={handleClick} aria-label={ariaLabel}>↵→<span className="icon">{icon}</span>↵</button>`,

  // 50. Multi Select
  `<div className="multi-select">↵→<div className="multi-select-control" onClick={toggleDropdown}>↵→→<div className="multi-select-value">↵→→→{selectedItems.length > 0 ? \`\${selectedItems.length} selected\` : placeholder}↵→→</div>↵→→<span className="multi-select-arrow">d</span>↵→</div>↵→{isOpen && (↵→→<div className="multi-select-dropdown">↵→→→{options.map(option => (↵→→→→<div↵→→→→→key={option.value}↵→→→→→className="multi-select-option"↵→→→→→onClick={() => toggleOption(option.value)}↵→→→→>↵→→→→→<input↵→→→→→→type="checkbox"↵→→→→→→checked={selectedItems.includes(option.value)}↵→→→→→→readOnly↵→→→→→/>↵→→→→→{option.label}↵→→→→</div>↵→→→))}↵→→</div>↵→)}↵</div>`,
];
