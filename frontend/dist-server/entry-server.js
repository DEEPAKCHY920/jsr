import { StrictMode, useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
// src/Navbar.jsx
var DESKTOP_QUERY = "(min-width: 900px)";
var navLinks = [
	{
		id: "home",
		href: "/#home",
		label: "Home",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" })
		})
	},
	{
		id: "services",
		href: "/#services",
		label: "Services",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
		})
	},
	{
		id: "about",
		href: "/#about",
		label: "About",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" })
		})
	},
	{
		id: "faq",
		href: "/#faq",
		label: "FAQ",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "10"
				}),
				/* @__PURE__ */ jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
				/* @__PURE__ */ jsx("line", {
					x1: "12",
					y1: "17",
					x2: "12.01",
					y2: "17"
				})
			]
		})
	},
	{
		id: "contact",
		href: "/#contact",
		label: "Contact",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" })
		})
	}
];
function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	const [scrollProgress, setScrollProgress] = useState(0);
	const hamburgerRef = useRef(null);
	const logoRef = useRef(null);
	useEffect(() => {
		if (typeof window === "undefined") return;
		let ticking = false;
		const handleScroll = () => {
			const isPast = window.scrollY > 20;
			setScrolled((prev) => prev !== isPast ? isPast : prev);
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
					const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
					setScrollProgress(Math.min(1, Math.max(0, progress)));
					ticking = false;
				});
				ticking = true;
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	useEffect(() => {
		if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
		const elements = [
			"home",
			"services",
			"about",
			"faq",
			"contact"
		].map((id) => document.getElementById(id)).filter(Boolean);
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) setActiveSection(entry.target.id);
			});
		}, { rootMargin: "-30% 0px -55% 0px" });
		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, []);
	useEffect(() => {
		if (typeof document === "undefined") return;
		if (mobileOpen) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	}, [mobileOpen]);
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key !== "Escape") return;
			if (mobileOpen) {
				setMobileOpen(false);
				hamburgerRef.current?.focus();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [mobileOpen]);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const mediaQuery = window.matchMedia(DESKTOP_QUERY);
		const resetForBreakpoint = (event) => {
			if (event.matches) setMobileOpen(false);
		};
		mediaQuery.addEventListener("change", resetForBreakpoint);
		return () => mediaQuery.removeEventListener("change", resetForBreakpoint);
	}, []);
	const handleMobileNavClick = (id) => {
		setActiveSection(id);
		setMobileOpen(false);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: "scroll-progress-bar",
		style: {
			transform: `scaleX(${scrollProgress})`,
			opacity: scrollProgress > 0 ? 1 : 0
		},
		"aria-hidden": "true"
	}), /* @__PURE__ */ jsx("header", {
		className: `site-header${scrolled ? " site-header--scrolled" : ""}`,
		role: "banner",
		children: /* @__PURE__ */ jsxs("nav", {
			className: `navbar${scrolled ? " navbar--scrolled" : ""}`,
			"aria-label": "Main navigation",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "container navbar__inner",
					children: [
						/* @__PURE__ */ jsx("a", {
							ref: logoRef,
							href: "/",
							className: "logo",
							"aria-label": "JSR EV SPARE PARTS – home",
							children: /* @__PURE__ */ jsx("img", {
								src: "/jsr-logo.png",
								alt: "JSR EV Spare Parts logo",
								className: "logo__img",
								width: "180",
								height: "60"
							})
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "nav-links",
							role: "list",
							children: navLinks.map((link) => {
								const isActive = activeSection === link.id;
								return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
									href: link.href,
									className: `nav-link${isActive ? " nav-link--active" : ""}`,
									"aria-current": isActive ? "page" : void 0,
									onClick: () => setActiveSection(link.id),
									children: [link.icon, link.label]
								}) }, link.id);
							})
						}),
						/* @__PURE__ */ jsxs("a", {
							href: "tel:+919990120067",
							className: "btn-enquire",
							"aria-label": "Call JSR EV SPARE PARTS at +91 9990120067",
							children: [/* @__PURE__ */ jsx("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": "true",
								focusable: "false",
								children: /* @__PURE__ */ jsx("path", { d: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" })
							}), "Call Now"]
						}),
						/* @__PURE__ */ jsxs("button", {
							ref: hamburgerRef,
							type: "button",
							className: `hamburger${mobileOpen ? " hamburger--open" : ""}`,
							id: "hamburger-btn",
							"aria-label": mobileOpen ? "Close navigation menu" : "Open navigation menu",
							"aria-expanded": mobileOpen,
							"aria-controls": "mobile-side-nav",
							onClick: () => setMobileOpen((open) => !open),
							children: [/* @__PURE__ */ jsxs("svg", {
								className: "hamburger__icon hamburger__icon--open",
								width: "26",
								height: "26",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.2",
								strokeLinecap: "round",
								"aria-hidden": "true",
								focusable: "false",
								children: [
									/* @__PURE__ */ jsx("line", {
										x1: "3",
										y1: "6",
										x2: "21",
										y2: "6"
									}),
									/* @__PURE__ */ jsx("line", {
										x1: "3",
										y1: "12",
										x2: "21",
										y2: "12"
									}),
									/* @__PURE__ */ jsx("line", {
										x1: "3",
										y1: "18",
										x2: "21",
										y2: "18"
									})
								]
							}), /* @__PURE__ */ jsxs("svg", {
								className: "hamburger__icon hamburger__icon--close",
								width: "26",
								height: "26",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.2",
								strokeLinecap: "round",
								"aria-hidden": "true",
								focusable: "false",
								children: [/* @__PURE__ */ jsx("line", {
									x1: "4",
									y1: "4",
									x2: "20",
									y2: "20"
								}), /* @__PURE__ */ jsx("line", {
									x1: "20",
									y1: "4",
									x2: "4",
									y2: "20"
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: `mobile-side-overlay${mobileOpen ? " mobile-side-overlay--open" : ""}`,
					"aria-hidden": !mobileOpen,
					onClick: () => setMobileOpen(false)
				}),
				/* @__PURE__ */ jsxs("aside", {
					className: `mobile-side-drawer${mobileOpen ? " mobile-side-drawer--open" : ""}`,
					id: "mobile-side-nav",
					role: "dialog",
					"aria-modal": "true",
					"aria-label": "Mobile navigation",
					"aria-hidden": !mobileOpen,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mobile-side-drawer__header",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/",
								className: "mobile-side-drawer__logo",
								"aria-label": "JSR EV SPARE PARTS – home",
								onClick: () => handleMobileNavClick("home"),
								children: /* @__PURE__ */ jsx("img", {
									src: "/jsr-logo.png",
									alt: "JSR EV Spare Parts logo",
									width: "140",
									height: "46",
									className: "mobile-side-drawer__logo-img"
								})
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "mobile-side-drawer__close-btn",
								"aria-label": "Close navigation menu",
								onClick: () => setMobileOpen(false),
								children: /* @__PURE__ */ jsxs("svg", {
									width: "22",
									height: "22",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.4",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									focusable: "false",
									children: [/* @__PURE__ */ jsx("line", {
										x1: "18",
										y1: "6",
										x2: "6",
										y2: "18"
									}), /* @__PURE__ */ jsx("line", {
										x1: "6",
										y1: "6",
										x2: "18",
										y2: "18"
									})]
								})
							})]
						}),
						/* @__PURE__ */ jsx("div", { className: "mobile-side-drawer__divider" }),
						/* @__PURE__ */ jsx("ul", {
							className: "mobile-side-drawer__nav",
							role: "list",
							children: navLinks.map((link) => {
								const isActive = activeSection === link.id;
								return /* @__PURE__ */ jsx("li", {
									className: "mobile-side-drawer__item",
									children: /* @__PURE__ */ jsxs("a", {
										href: link.href,
										className: `mobile-side-drawer__link${isActive ? " mobile-side-drawer__link--active" : ""}`,
										"aria-current": isActive ? "page" : void 0,
										onClick: () => handleMobileNavClick(link.id),
										children: [/* @__PURE__ */ jsx("span", {
											className: "mobile-side-drawer__icon",
											children: link.icon
										}), /* @__PURE__ */ jsx("span", {
											className: "mobile-side-drawer__label",
											children: link.label
										})]
									})
								}, link.id);
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mobile-side-drawer__footer",
							children: [
								/* @__PURE__ */ jsxs("a", {
									href: "https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20spare%20parts%20or%20services.",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "mobile-side-drawer__whatsapp-btn",
									onClick: () => setMobileOpen(false),
									"aria-label": "Chat on WhatsApp (opens in a new tab)",
									children: [/* @__PURE__ */ jsx("svg", {
										width: "20",
										height: "20",
										viewBox: "0 0 24 24",
										fill: "currentColor",
										"aria-hidden": "true",
										focusable: "false",
										children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" })
									}), /* @__PURE__ */ jsx("span", { children: "WhatsApp Enquiry" })]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "tel:+919990120067",
									className: "mobile-side-drawer__call-btn",
									onClick: () => setMobileOpen(false),
									"aria-label": "Call shop at +91 9990120067",
									children: [/* @__PURE__ */ jsx("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "currentColor",
										"aria-hidden": "true",
										focusable: "false",
										children: /* @__PURE__ */ jsx("path", { d: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" })
									}), /* @__PURE__ */ jsx("span", { children: "Call +91 9990120067" })]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mobile-side-drawer__shop-info",
									children: "Rohini Sector 18, Delhi • 8:00 AM – 8:00 PM"
								})
							]
						})
					]
				})
			]
		})
	})] });
}
// src/OpenNowBadge.jsx
function getShopStatus() {
	try {
		const now = /* @__PURE__ */ new Date();
		const parts = new Intl.DateTimeFormat("en-US", {
			timeZone: "Asia/Kolkata",
			hour: "numeric",
			minute: "numeric",
			hour12: false
		}).formatToParts(now);
		const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "12", 10);
		const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
		const currentMinutes = hour * 60 + minute;
		if (currentMinutes >= 480 && currentMinutes < 1200) return {
			isOpen: true,
			text: "Open Now • Closes at 8:00 PM"
		};
		else return {
			isOpen: false,
			text: "Closed Now • Opens at 8:00 AM"
		};
	} catch {
		return {
			isOpen: true,
			text: "Open Every Day • 8:00 AM – 8:00 PM"
		};
	}
}
function OpenNowBadge() {
	const [status, setStatus] = useState({
		isOpen: true,
		text: "Open Every Day • 8:00 AM – 8:00 PM"
	});
	useEffect(() => {
		setStatus(getShopStatus());
		const interval = setInterval(() => {
			setStatus(getShopStatus());
		}, 6e4);
		return () => clearInterval(interval);
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: `open-badge${status.isOpen ? " open-badge--open" : " open-badge--closed"}`,
		"aria-live": "polite",
		children: [/* @__PURE__ */ jsx("span", {
			className: "open-badge__dot",
			"aria-hidden": "true"
		}), /* @__PURE__ */ jsx("span", {
			className: "open-badge__text",
			children: status.text
		})]
	});
}
// src/Hero.jsx
function Hero() {
	return /* @__PURE__ */ jsx("section", {
		className: "hero",
		id: "home",
		"aria-labelledby": "hero-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container hero__inner",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "hero__text",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "hero__eyebrow-row",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "hero__badge",
							children: [/* @__PURE__ */ jsx("svg", {
								className: "hero__badge-icon",
								viewBox: "0 0 24 24",
								fill: "none",
								"aria-hidden": "true",
								focusable: "false",
								children: /* @__PURE__ */ jsx("path", {
									d: "M13 2L3 14h8l-2 8 11-13h-8l3-7z",
									fill: "#65D510",
									stroke: "#65D510",
									strokeWidth: "1",
									strokeLinejoin: "round"
								})
							}), /* @__PURE__ */ jsx("span", { children: "E-Rickshaw & Electric Scooter Spare Parts" })]
						}), /* @__PURE__ */ jsx(OpenNowBadge, {})]
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "hero__heading",
						id: "hero-heading",
						children: [/* @__PURE__ */ jsx("span", {
							className: "hero__heading-sub",
							children: "Your Destination for"
						}), /* @__PURE__ */ jsxs("span", {
							className: "hero__heading-highlight",
							children: ["E-Rickshaw Spare Parts", /* @__PURE__ */ jsx("svg", {
								className: "hero__heading-curve",
								viewBox: "0 0 260 14",
								fill: "none",
								"aria-hidden": "true",
								focusable: "false",
								children: /* @__PURE__ */ jsx("path", {
									d: "M3 10C65 3 175 3 257 10",
									stroke: "#65D510",
									strokeWidth: "4.5",
									strokeLinecap: "round"
								})
							})]
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "hero__desc",
						children: "Genuine e-rickshaw spare parts in Rohini and electric scooter spare parts with repair and fitting services."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hero__actions",
						children: [/* @__PURE__ */ jsxs("a", {
							href: "https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20spare%20parts%20or%20services.",
							className: "hero__btn hero__btn--whatsapp",
							"aria-label": "Send JSR EV Spare Parts a WhatsApp enquiry (opens in a new tab)",
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ jsxs("svg", {
								className: "hero__btn-icon",
								width: "20",
								height: "20",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": "true",
								children: [/* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }), /* @__PURE__ */ jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" })]
							}), "WhatsApp Enquiry"]
						}), /* @__PURE__ */ jsxs("a", {
							href: "tel:+919990120067",
							className: "hero__btn hero__btn--call",
							"aria-label": "Call JSR EV Spare Parts",
							children: [/* @__PURE__ */ jsx("svg", {
								className: "hero__btn-icon",
								width: "18",
								height: "18",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("path", { d: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" })
							}), "Call Now"]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hero__features",
						role: "list",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "hero__feature-item",
								role: "listitem",
								children: [/* @__PURE__ */ jsxs("svg", {
									className: "hero__feature-icon",
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }), /* @__PURE__ */ jsx("path", { d: "M9 12l2 2 4-4" })]
								}), /* @__PURE__ */ jsx("span", { children: "Genuine Parts" })]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "hero__feature-divider",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hero__feature-item",
								role: "listitem",
								children: [/* @__PURE__ */ jsxs("svg", {
									className: "hero__feature-icon",
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: [
										/* @__PURE__ */ jsx("rect", {
											x: "1",
											y: "3",
											width: "15",
											height: "13"
										}),
										/* @__PURE__ */ jsx("polygon", { points: "16 8 20 8 23 11 23 16 16 16 16 8" }),
										/* @__PURE__ */ jsx("circle", {
											cx: "5.5",
											cy: "18.5",
											r: "2.5"
										}),
										/* @__PURE__ */ jsx("circle", {
											cx: "18.5",
											cy: "18.5",
											r: "2.5"
										})
									]
								}), /* @__PURE__ */ jsx("span", { children: "Fast Service" })]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "hero__feature-divider",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hero__feature-item",
								role: "listitem",
								children: [/* @__PURE__ */ jsx("svg", {
									className: "hero__feature-icon",
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: /* @__PURE__ */ jsx("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
								}), /* @__PURE__ */ jsx("span", { children: "Repair & Fitting" })]
							})
						]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "hero__image-wrap",
				children: [/* @__PURE__ */ jsx("div", {
					className: "hero__glow-accent",
					"aria-hidden": "true"
				}), /* @__PURE__ */ jsx("img", {
					src: "/hero-ev-banner.png",
					alt: "Blue e-rickshaw with motor, controller, brake shoes and tyre spare parts",
					className: "hero__banner-img",
					width: "552",
					height: "402",
					loading: "eager",
					decoding: "async",
					fetchPriority: "high"
				})]
			})]
		})
	});
}
// src/Services.jsx
var stockParts = [
	{
		id: "motor",
		name: "Motor",
		img: "/parts/motor.png",
		width: 70,
		height: 50,
		alt: "Electric rickshaw motor"
	},
	{
		id: "controller",
		name: "Controller",
		img: "/parts/controller.png",
		width: 70,
		height: 50,
		alt: "E-rickshaw speed controller"
	},
	{
		id: "battery-charger",
		name: "Battery Charger",
		img: "/parts/battery-charger.png",
		width: 70,
		height: 50,
		alt: "E-rickshaw battery charger"
	},
	{
		id: "differential",
		name: "Differential",
		img: "/parts/differential.png",
		width: 70,
		height: 50,
		alt: "E-rickshaw rear axle differential gear"
	},
	{
		id: "brake-shoes",
		name: "Brake Shoes",
		img: "/parts/brake-shoes.png",
		width: 70,
		height: 50,
		alt: "E-rickshaw brake shoes"
	},
	{
		id: "shocker",
		name: "Shocker",
		img: "/parts/shocker.png",
		width: 70,
		height: 50,
		alt: "E-rickshaw suspension shocker"
	},
	{
		id: "tyres",
		name: "Tyres",
		img: "/parts/tyres.png",
		width: 70,
		height: 50,
		alt: "Electric rickshaw durable tyres"
	},
	{
		id: "wiring-kit",
		name: "Wiring Kit",
		img: "/parts/wiring-kit.png",
		width: 70,
		height: 46,
		alt: "E-rickshaw full wiring harness kit"
	},
	{
		id: "dc-converter",
		name: "DC Converter",
		img: "/parts/dc-converter.png",
		width: 70,
		height: 46,
		alt: "E-rickshaw DC to DC converter"
	},
	{
		id: "headlight",
		name: "Headlight",
		img: "/parts/headlight.png",
		width: 70,
		height: 46,
		alt: "E-rickshaw bright LED headlight"
	},
	{
		id: "tail-light",
		name: "Tail Light",
		img: "/parts/tail-light.png",
		width: 70,
		height: 46,
		alt: "E-rickshaw tail light lamp"
	},
	{
		id: "accelerator",
		name: "Accelerator",
		img: "/parts/accelerator.png",
		width: 70,
		height: 46,
		alt: "E-rickshaw accelerator pedal throttle"
	},
	{
		id: "battery-packs",
		name: "Battery Packs",
		img: "/parts/battery-packs.png",
		width: 70,
		height: 46,
		alt: "E-rickshaw heavy duty battery pack"
	}
];
var trustFeatures = [
	{
		id: "genuine-parts",
		title: "Genuine Parts",
		sub: "100% Original & Reliable",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }), /* @__PURE__ */ jsx("path", { d: "m9 12 2 2 4-4" })]
		})
	},
	{
		id: "repair-fitting",
		title: "Repair & Fitting",
		sub: "Expert Service Support",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
		})
	},
	{
		id: "fast-service",
		title: "Fast Service",
		sub: "Quick Turnaround Time",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: [
				/* @__PURE__ */ jsx("rect", {
					x: "1",
					y: "3",
					width: "15",
					height: "13",
					rx: "1"
				}),
				/* @__PURE__ */ jsx("polygon", { points: "16 8 20 8 23 11 23 16 16 16 16 8" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "5.5",
					cy: "18.5",
					r: "2.5"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "18.5",
					cy: "18.5",
					r: "2.5"
				})
			]
		})
	},
	{
		id: "trusted-shop",
		title: "Trusted Shop",
		sub: "In Rohini, Delhi",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ jsx("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), /* @__PURE__ */ jsx("polyline", { points: "9 22 9 12 15 12 15 22" })]
		})
	}
];
function Services() {
	return /* @__PURE__ */ jsx("section", {
		className: "services",
		id: "services",
		"aria-labelledby": "services-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container services__inner",
			children: [
				/* @__PURE__ */ jsxs("header", {
					className: "services__header reveal-up",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "services__label",
							children: "WHAT WE DO"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "services__accent",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "services__heading",
							id: "services-heading",
							children: "Our Services"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "services__subtitle",
							children: "Spare parts, vehicle servicing and parts fitting for your electric vehicle."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "services__grid reveal-stagger",
					children: [
						/* @__PURE__ */ jsxs("article", {
							className: "services__card reveal-up",
							tabIndex: "0",
							children: [/* @__PURE__ */ jsx("div", {
								className: "services__icon",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsxs("svg", {
									viewBox: "0 0 64 64",
									fill: "none",
									focusable: "false",
									children: [/* @__PURE__ */ jsx("path", {
										d: "m27 8 10 1 2 8 7 4 8-2 5 9-6 6v8l6 6-6 9-8-3-7 4-2 8H26l-2-8-7-4-8 3-5-9 6-6v-8l-6-6 5-9 8 2 7-4 3-9Z",
										stroke: "currentColor",
										strokeWidth: "4",
										strokeLinejoin: "round"
									}), /* @__PURE__ */ jsx("circle", {
										cx: "32",
										cy: "32",
										r: "11",
										stroke: "#65D510",
										strokeWidth: "4"
									})]
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "services__card-content",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "services__card-heading",
										children: "Spare Parts Sales"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "services__card-copy",
										children: "Spare parts for e-rickshaws and electric scooters."
									}),
									/* @__PURE__ */ jsxs("a", {
										href: "https://wa.me/919990120067?text=Hi%20JSR%20EV%2C%20I%20want%20to%20check%20availability%20of%20spare%20parts.",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "services__card-action",
										"aria-label": "Check spare parts availability on WhatsApp (opens in a new tab)",
										children: [/* @__PURE__ */ jsx("span", { children: "Check Availability" }), /* @__PURE__ */ jsx("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2.5",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											"aria-hidden": "true",
											children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("article", {
							className: "services__card reveal-up",
							tabIndex: "0",
							children: [/* @__PURE__ */ jsx("div", {
								className: "services__icon",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsxs("svg", {
									viewBox: "0 0 64 64",
									fill: "none",
									focusable: "false",
									children: [/* @__PURE__ */ jsx("path", {
										d: "M26 35 10 51a5 5 0 0 0 7 7l16-16M38 29l12-12 7-1-1 7-12 12",
										stroke: "currentColor",
										strokeWidth: "4",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									}), /* @__PURE__ */ jsx("path", {
										d: "M12 9c-2 8 1 15 8 18 4 2 8 1 11-1l21 26a5 5 0 0 0 8-6L36 22c1-4 0-8-3-11-4-4-9-5-14-3l8 8-8 8-9-8c-1-2-1-5 2-7Z",
										stroke: "#65D510",
										strokeWidth: "4",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})]
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "services__card-content",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "services__card-heading",
										children: "Repair Services"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "services__card-copy",
										children: "Visit our shop to discuss your vehicle’s repair requirements."
									}),
									/* @__PURE__ */ jsxs("a", {
										href: "tel:+919990120067",
										className: "services__card-action",
										"aria-label": "Call JSR EV to discuss repair services and pricing",
										children: [/* @__PURE__ */ jsx("span", { children: "Call for Price" }), /* @__PURE__ */ jsx("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2.5",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											"aria-hidden": "true",
											children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("article", {
							className: "services__card reveal-up",
							tabIndex: "0",
							children: [/* @__PURE__ */ jsx("div", {
								className: "services__icon",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsxs("svg", {
									viewBox: "0 0 64 64",
									fill: "none",
									focusable: "false",
									children: [
										/* @__PURE__ */ jsx("path", {
											d: "M24 9h11l2 8 7 3 7-3 6 9-6 6v5",
											stroke: "currentColor",
											strokeWidth: "4",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										}),
										/* @__PURE__ */ jsx("path", {
											d: "M24 9 22 17l-7 3-7-3-5 9 5 6v8l-5 6 5 9 7-3 7 3 3-7",
											stroke: "currentColor",
											strokeWidth: "4",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										}),
										/* @__PURE__ */ jsx("path", {
											d: "M25 25c6-5 15-4 20 2 4 5 4 12 1 17l12 12a5 5 0 0 1-7 7L39 51c-6 3-13 1-17-4-4-6-3-14 2-19l8 8 7-7-8-8c-2 1-4 2-6 4Z",
											stroke: "#65D510",
											strokeWidth: "4",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									]
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "services__card-content",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "services__card-heading",
										children: "Parts Fitting"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "services__card-copy",
										children: "Get fitting services for your e-rickshaw and electric scooter parts."
									}),
									/* @__PURE__ */ jsxs("a", {
										href: "https://wa.me/919990120067?text=Hello%20JSR%20EV%2C%20I%20would%20like%20to%20enquire%20about%20fitting%20charges%20for%20my%20electric%20vehicle.",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "services__card-action",
										"aria-label": "Enquire about parts fitting charges on WhatsApp (opens in a new tab)",
										children: [/* @__PURE__ */ jsx("span", { children: "Check Fitting Price" }), /* @__PURE__ */ jsx("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2.5",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											"aria-hidden": "true",
											children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
										})]
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "stock-parts reveal-up",
					id: "spare-parts",
					"aria-labelledby": "stock-parts-heading",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "stock-parts__brand-tag",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "stock-parts__brand-line",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "stock-parts__brand-badge",
									children: [/* @__PURE__ */ jsx("span", {
										className: "stock-parts__brand-name",
										children: "JSR EV"
									}), /* @__PURE__ */ jsx("span", {
										className: "stock-parts__brand-sub",
										children: "SPARE PARTS"
									})]
								}),
								/* @__PURE__ */ jsx("span", {
									className: "stock-parts__brand-line",
									"aria-hidden": "true"
								})
							]
						}),
						/* @__PURE__ */ jsxs("h3", {
							className: "stock-parts__heading",
							id: "stock-parts-heading",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "stock-parts__heading-main",
									children: "Spare Parts"
								}),
								" ",
								/* @__PURE__ */ jsxs("span", {
									className: "stock-parts__heading-highlight",
									children: ["We Stock", /* @__PURE__ */ jsx("svg", {
										className: "stock-parts__swoosh",
										viewBox: "0 0 140 16",
										fill: "none",
										"aria-hidden": "true",
										focusable: "false",
										children: /* @__PURE__ */ jsx("path", {
											d: "M4 12C45 3 95 3 136 12",
											stroke: "#63D817",
											strokeWidth: "4",
											strokeLinecap: "round"
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "stock-parts__subtitle",
							children: "A complete range of genuine spare parts for e-rickshaws – repair, replacement and upgrade, all in one place."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "stock-parts__showcase",
							children: [/* @__PURE__ */ jsx("div", {
								className: "stock-parts__cards-col",
								children: /* @__PURE__ */ jsx("div", {
									className: "stock-parts__grid",
									role: "list",
									"aria-label": "Spare parts in stock",
									children: stockParts.map((part) => /* @__PURE__ */ jsxs("div", {
										className: "stock-parts__card",
										role: "listitem",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "stock-parts__img-wrap",
												children: /* @__PURE__ */ jsx("img", {
													src: part.img,
													alt: part.alt,
													width: part.width,
													height: part.height,
													loading: "lazy",
													className: "stock-parts__img"
												})
											}),
											/* @__PURE__ */ jsx("span", {
												className: "stock-parts__name",
												children: part.name
											}),
											/* @__PURE__ */ jsx("span", {
												className: "stock-parts__bar",
												"aria-hidden": "true"
											})
										]
									}, part.id))
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "stock-parts__vehicle-col",
								children: /* @__PURE__ */ jsx("img", {
									src: "/parts/blue-erickshaw.png",
									alt: "Modern blue electric rickshaw for spare parts and fitting",
									width: "275",
									height: "225",
									loading: "lazy",
									className: "stock-parts__vehicle-img"
								})
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "stock-parts__cta-wrap",
							children: /* @__PURE__ */ jsxs("a", {
								href: "#contact",
								className: "stock-parts__cta-btn",
								"aria-label": "Contact JSR EV for service",
								children: [
									/* @__PURE__ */ jsx("svg", {
										className: "stock-parts__cta-icon-left",
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.4",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										"aria-hidden": "true",
										focusable: "false",
										children: /* @__PURE__ */ jsx("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
									}),
									/* @__PURE__ */ jsx("span", { children: "Contact Us for Service" }),
									/* @__PURE__ */ jsx("svg", {
										className: "stock-parts__cta-icon-right",
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.4",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										"aria-hidden": "true",
										focusable: "false",
										children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
									})
								]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "stock-parts__trust-strip",
							"aria-label": "Shop guarantees and service features",
							children: trustFeatures.map((item) => /* @__PURE__ */ jsxs("div", {
								className: "stock-parts__trust-item",
								children: [/* @__PURE__ */ jsx("div", {
									className: "stock-parts__trust-icon",
									"aria-hidden": "true",
									children: item.icon
								}), /* @__PURE__ */ jsxs("div", {
									className: "stock-parts__trust-text",
									children: [/* @__PURE__ */ jsx("strong", {
										className: "stock-parts__trust-title",
										children: item.title
									}), /* @__PURE__ */ jsx("span", {
										className: "stock-parts__trust-sub",
										children: item.sub
									})]
								})]
							}, item.id))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "stock-parts__categories-guide",
							"aria-label": "E-Rickshaw Spare Parts Categories and Specifications",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "stock-parts__categories-title",
								children: "E-Rickshaw Parts & Service Categories"
							}), /* @__PURE__ */ jsxs("div", {
								className: "stock-parts__categories-grid",
								children: [
									/* @__PURE__ */ jsxs("article", {
										className: "stock-parts__category-card",
										children: [/* @__PURE__ */ jsx("h5", {
											className: "stock-parts__category-heading",
											children: "Motors & Drivetrain"
										}), /* @__PURE__ */ jsx("p", {
											className: "stock-parts__category-text",
											children: "Heavy-duty copper-wound BLDC motors (48V / 60V) and precision-machined rear axle differential gears engineered for superior torque, hill-climbing power, and heavy passenger loads in Delhi."
										})]
									}),
									/* @__PURE__ */ jsxs("article", {
										className: "stock-parts__category-card",
										children: [/* @__PURE__ */ jsx("h5", {
											className: "stock-parts__category-heading",
											children: "Controllers & Converters"
										}), /* @__PURE__ */ jsx("p", {
											className: "stock-parts__category-text",
											children: "Intelligent brushless speed controllers with heat-sink protection and 48V/60V-to-12V step-down DC converters powering lighting, horn, and electronic accessories with zero fluctuations."
										})]
									}),
									/* @__PURE__ */ jsxs("article", {
										className: "stock-parts__category-card",
										children: [/* @__PURE__ */ jsx("h5", {
											className: "stock-parts__category-heading",
											children: "Battery Chargers & Packs"
										}), /* @__PURE__ */ jsx("p", {
											className: "stock-parts__category-text",
											children: "Automatic micro-controlled SMPS battery chargers with voltage cut-off, short-circuit protection, and durable battery packs designed for prolonged daily commercial operation."
										})]
									}),
									/* @__PURE__ */ jsxs("article", {
										className: "stock-parts__category-card",
										children: [/* @__PURE__ */ jsx("h5", {
											className: "stock-parts__category-heading",
											children: "Suspension, Brakes & Tyres"
										}), /* @__PURE__ */ jsx("p", {
											className: "stock-parts__category-text",
											children: "Heavy-duty hydraulic front and rear shockers, heat-resistant brake shoes for quick emergency stopping, and high-ply commercial tyres offering high durability on rough urban roads."
										})]
									}),
									/* @__PURE__ */ jsxs("article", {
										className: "stock-parts__category-card",
										children: [/* @__PURE__ */ jsx("h5", {
											className: "stock-parts__category-heading",
											children: "Wiring Kits & Accessories"
										}), /* @__PURE__ */ jsx("p", {
											className: "stock-parts__category-text",
											children: "Complete copper wiring harness kits, bright energy-saving LED headlights, high-visibility tail lamps, and ergonomic accelerator throttle grips with forward-reverse toggles."
										})]
									}),
									/* @__PURE__ */ jsxs("article", {
										className: "stock-parts__category-card",
										children: [/* @__PURE__ */ jsx("h5", {
											className: "stock-parts__category-heading",
											children: "Rohini Repair & Fitting"
										}), /* @__PURE__ */ jsx("p", {
											className: "stock-parts__category-text",
											children: "Professional in-shop component diagnostics, motor servicing, axle alignment, and fast same-day parts replacement by skilled technicians in Sector 18, Rohini, Delhi."
										})]
									})
								]
							})]
						})
					]
				})
			]
		})
	});
}
// src/WhyChooseUs.jsx
var features = [
	{
		id: "wide-range-spares",
		title: "Wide Range of EV Spares",
		desc: "Parts for e-rickshaws and electric scooters.",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "26",
			height: "26",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#2CA50D",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: [
				/* @__PURE__ */ jsx("path", { d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" }),
				/* @__PURE__ */ jsx("path", { d: "m3.3 7 8.7 5 8.7-5" }),
				/* @__PURE__ */ jsx("path", { d: "M12 22V12" })
			]
		})
	},
	{
		id: "repair-fitting",
		title: "Repair & Fitting",
		desc: "Practical support for your vehicle.",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "26",
			height: "26",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#2CA50D",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ jsx("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }), /* @__PURE__ */ jsx("line", {
				x1: "4",
				y1: "20",
				x2: "8",
				y2: "16"
			})]
		})
	},
	{
		id: "part-guidance",
		title: "Helpful Part Guidance",
		desc: "Get help finding the right spare part.",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "26",
			height: "26",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#2CA50D",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" })
		})
	},
	{
		id: "visit-shop",
		title: "Visit Our Shop",
		desc: "Sector 18, Near Data Ram Apartment.",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "26",
			height: "26",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#2CA50D",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ jsx("path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }), /* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "10",
				r: "3"
			})]
		})
	}
];
function WhyChooseUs() {
	return /* @__PURE__ */ jsx("section", {
		className: "why-us",
		id: "why-choose-us",
		"aria-labelledby": "why-us-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container why-us__inner",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "why-us__content reveal-left",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "why-us__badge-row",
						children: [/* @__PURE__ */ jsx("span", {
							className: "why-us__badge",
							children: "WHY CHOOSE US"
						}), /* @__PURE__ */ jsx("span", {
							className: "why-us__badge-line",
							"aria-hidden": "true"
						})]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "why-us__heading",
						id: "why-us-heading",
						children: "Why Choose JSR EV Spare Parts?"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "why-us__heading-accent",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "why-us__subtitle",
						children: "Reliable parts and practical support for your electric vehicle."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "why-us__grid reveal-stagger",
						children: features.map((item) => /* @__PURE__ */ jsxs("article", {
							className: "why-us__card reveal-up",
							tabIndex: "0",
							children: [/* @__PURE__ */ jsx("div", {
								className: "why-us__card-icon",
								"aria-hidden": "true",
								children: item.icon
							}), /* @__PURE__ */ jsxs("div", {
								className: "why-us__card-info",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "why-us__card-title",
									children: item.title
								}), /* @__PURE__ */ jsx("p", {
									className: "why-us__card-desc",
									children: item.desc
								})]
							})]
						}, item.id))
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "why-us__media reveal-right",
				children: /* @__PURE__ */ jsx("div", {
					className: "why-us__image-wrapper",
					children: /* @__PURE__ */ jsx("img", {
						src: "/why-choose-us-parts.png",
						alt: "EV spare parts including motor, controller, throttle, and shock absorber on workbench with e-rickshaw at JSR EV SPARE PARTS",
						className: "why-us__image",
						width: "540",
						height: "480",
						loading: "lazy",
						decoding: "async"
					})
				})
			})]
		})
	});
}
// src/StatsStrip.jsx
function StatsStrip() {
	const containerRef = useRef(null);
	const [counts, setCounts] = useState({
		parts: 300,
		vehicles: 800
	});
	useEffect(() => {
		if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
		setCounts({
			parts: 0,
			vehicles: 0
		});
		let hasAnimated = false;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !hasAnimated) {
					hasAnimated = true;
					observer.disconnect();
					const startTime = performance.now();
					const duration = 1200;
					const animate = (currentTime) => {
						const elapsed = currentTime - startTime;
						const progress = Math.min(elapsed / duration, 1);
						const eased = 1 - Math.pow(1 - progress, 3);
						setCounts({
							parts: Math.round(eased * 300),
							vehicles: Math.round(eased * 800)
						});
						if (progress < 1) requestAnimationFrame(animate);
						else setCounts({
							parts: 300,
							vehicles: 800
						});
					};
					requestAnimationFrame(animate);
				}
			});
		}, { threshold: .2 });
		if (containerRef.current) observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsx("section", {
		className: "stats-strip",
		ref: containerRef,
		"aria-label": "Key business facts",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container stats-strip__inner",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "stats-strip__item reveal-up",
					"aria-label": "Since 2024 serving Delhi",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "stats-strip__number",
							children: /* @__PURE__ */ jsx("span", {
								className: "stats-strip__highlight stats-strip__highlight--since",
								children: "Since 2024"
							})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "stats-strip__label",
							children: "Serving Delhi"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "stats-strip__sub",
							children: "EV Spare Parts & Service"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "stats-strip__divider",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "stats-strip__item reveal-up",
					"aria-label": "3 branches in Delhi, Rohini and Badli",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "stats-strip__number",
							children: /* @__PURE__ */ jsx("span", {
								className: "stats-strip__highlight",
								children: "3 Branches"
							})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "stats-strip__label",
							children: "in Delhi"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "stats-strip__sub",
							children: "Rohini • Badli"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "stats-strip__divider",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "stats-strip__item reveal-up",
					"aria-label": "300 plus EV spare parts",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "stats-strip__number",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ jsx("span", {
								className: "stats-strip__val stats-strip__val--3dig",
								children: counts.parts
							}), /* @__PURE__ */ jsx("span", {
								className: "stats-strip__suffix",
								children: "+"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "stats-strip__label",
							children: "EV Spare Parts"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "stats-strip__sub",
							children: "Motors, controllers & spares"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "stats-strip__divider",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "stats-strip__item reveal-up",
					"aria-label": "800 plus vehicles repaired",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "stats-strip__number",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ jsx("span", {
								className: "stats-strip__val stats-strip__val--3dig",
								children: counts.vehicles
							}), /* @__PURE__ */ jsx("span", {
								className: "stats-strip__suffix",
								children: "+"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "stats-strip__label",
							children: "Vehicles Repaired"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "stats-strip__sub",
							children: "E-rickshaws & e-scooters"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "stats-strip__divider",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "stats-strip__item reveal-up",
					"aria-label": "7 days open every day",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "stats-strip__number",
							children: /* @__PURE__ */ jsx("span", {
								className: "stats-strip__highlight",
								children: "7 Days"
							})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "stats-strip__label",
							children: "Open Every Day"
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "stats-strip__sub",
							children: [
								/* @__PURE__ */ jsx("time", { children: "8:00 AM" }),
								" – ",
								/* @__PURE__ */ jsx("time", { children: "8:00 PM" })
							]
						})
					]
				})
			]
		})
	});
}
// assets/images/founder-deepak-choudhary.webp
var founder_deepak_choudhary_default = "/assets/founder-deepak-choudhary-Db5M9Y9t.webp";
// src/About.jsx
function About() {
	return /* @__PURE__ */ jsx("section", {
		className: "about",
		id: "about",
		"aria-labelledby": "about-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container about__container",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "about__header reveal-up",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "about__label-row",
						children: [/* @__PURE__ */ jsx("p", {
							className: "about__label",
							children: "ABOUT OUR SHOP"
						}), /* @__PURE__ */ jsx("span", {
							className: "about__label-line",
							"aria-hidden": "true"
						})]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "about__heading",
						id: "about-heading",
						children: "About JSR EV Spare Parts"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "about__copy",
						children: "Established in 2024, JSR EV Spare Parts is a trusted local shop in Sector 18, Rohini, Delhi, supplying genuine spare parts, vehicle repair and component fitting services for e-rickshaws and electric scooters. We supply EV spare parts to drivers, mechanics and dealers across Rohini, Badli and North Delhi."
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "about__grid",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "about__media reveal-up",
					children: [/* @__PURE__ */ jsx("div", {
						className: "about__photo-wrapper",
						children: /* @__PURE__ */ jsx("img", {
							src: "/shop.jpg",
							alt: "JSR EV Spare Parts physical shop front with JSR EV SPARES PARTS signboard in Sector 18, Rohini, Delhi",
							className: "about__photo",
							loading: "lazy",
							decoding: "async",
							width: "1024",
							height: "576"
						})
					}), /* @__PURE__ */ jsx("span", {
						className: "about__photo-caption",
						children: "JSR EV Spare Parts — Our Physical Shop in Rohini, Delhi"
					})]
				}), /* @__PURE__ */ jsxs("article", {
					className: "founder-card reveal-up",
					"aria-labelledby": "founder-name",
					children: [/* @__PURE__ */ jsx("div", {
						className: "founder-card__portrait-col",
						children: /* @__PURE__ */ jsxs("div", {
							className: "founder-card__portrait-frame",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "founder-card__corner founder-card__corner--top",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "founder-card__corner founder-card__corner--bottom",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsx("img", {
									src: founder_deepak_choudhary_default,
									alt: "Deepak Choudhary, founder of JSR EV Spare Parts",
									className: "founder-card__img",
									width: "200",
									height: "200",
									loading: "lazy",
									decoding: "async"
								})
							]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "founder-card__content-col",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "founder-card__name",
								id: "founder-name",
								children: "Deepak Choudhary"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "founder-card__role",
								children: "Founder, JSR EV Spare Parts"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "founder-card__bio",
								children: "Deepak Choudhary leads JSR EV Spare Parts, helping vehicle owners and mechanics find original, reliable spares and fitting solutions."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "founder-card__chips",
								role: "list",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "founder-card__chip",
									role: "listitem",
									children: [/* @__PURE__ */ jsxs("svg", {
										width: "15",
										height: "15",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										"aria-hidden": "true",
										focusable: "false",
										children: [
											/* @__PURE__ */ jsx("rect", {
												x: "3",
												y: "4",
												width: "18",
												height: "18",
												rx: "2",
												ry: "2"
											}),
											/* @__PURE__ */ jsx("line", {
												x1: "16",
												y1: "2",
												x2: "16",
												y2: "6"
											}),
											/* @__PURE__ */ jsx("line", {
												x1: "8",
												y1: "2",
												x2: "8",
												y2: "6"
											}),
											/* @__PURE__ */ jsx("line", {
												x1: "3",
												y1: "10",
												x2: "21",
												y2: "10"
											})
										]
									}), "Since 2024"]
								}), /* @__PURE__ */ jsxs("span", {
									className: "founder-card__chip",
									role: "listitem",
									children: [/* @__PURE__ */ jsxs("svg", {
										width: "15",
										height: "15",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										"aria-hidden": "true",
										focusable: "false",
										children: [/* @__PURE__ */ jsx("path", { d: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" }), /* @__PURE__ */ jsx("circle", {
											cx: "12",
											cy: "10",
											r: "2.5"
										})]
									}), "Rohini, Delhi"]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "founder-card__actions",
								children: [/* @__PURE__ */ jsxs("a", {
									href: "tel:+919990120067",
									className: "founder-card__btn founder-card__btn--call",
									"aria-label": "Call Deepak Choudhary at +91 9990120067",
									children: [/* @__PURE__ */ jsx("svg", {
										width: "16",
										height: "16",
										viewBox: "0 0 24 24",
										fill: "currentColor",
										"aria-hidden": "true",
										focusable: "false",
										children: /* @__PURE__ */ jsx("path", { d: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" })
									}), "Call Now"]
								}), /* @__PURE__ */ jsxs("a", {
									href: "https://wa.me/919990120067?text=Hello%20Deepak%20ji%2C%20I%20would%20like%20to%20enquire%20about%20e-rickshaw%20spare%20parts.",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "founder-card__btn founder-card__btn--wa",
									"aria-label": "Chat with Deepak Choudhary on WhatsApp (opens in a new tab)",
									children: [/* @__PURE__ */ jsxs("svg", {
										width: "17",
										height: "17",
										viewBox: "0 0 24 24",
										fill: "currentColor",
										"aria-hidden": "true",
										focusable: "false",
										children: [/* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }), /* @__PURE__ */ jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" })]
									}), "WhatsApp"]
								})]
							})
						]
					})]
				})]
			})]
		})
	});
}
// src/config/reviews.js
var GOOGLE_REVIEW_URL = "https://g.page/r/CSGeGiJGb0-IEBM/review";
var GOOGLE_PROFILE_URL = "https://share.google/6Zp1shhSR81Sidhjp";
// src/Reviews.jsx
function Reviews() {
	return /* @__PURE__ */ jsx("section", {
		className: "reviews",
		id: "reviews",
		"aria-labelledby": "reviews-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container reviews__inner",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "reviews__header reveal-up",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "reviews__badge-row",
						children: [/* @__PURE__ */ jsx("span", {
							className: "reviews__badge",
							children: "CUSTOMER REVIEWS"
						}), /* @__PURE__ */ jsx("span", {
							className: "reviews__badge-line",
							"aria-hidden": "true"
						})]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "reviews__heading",
						id: "reviews-heading",
						children: "Customer Reviews"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "reviews__heading-accent",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "reviews__subtitle",
						children: "Your feedback helps us serve you better. Share your experience with JSR EV SPARE PARTS."
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "reviews__card reveal-up",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "reviews__stars",
						"aria-hidden": "true",
						children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", {
							className: "reviews__star-icon",
							width: "22",
							height: "22",
							viewBox: "0 0 24 24",
							fill: "#f59e0b",
							focusable: "false",
							children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" })
						}, i))
					}),
					/* @__PURE__ */ jsx("p", {
						className: "reviews__card-title",
						children: "Share Your Thoughts on Google"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "reviews__card-desc",
						children: "Whether you visited us for genuine e-rickshaw spare parts, battery chargers, or vehicle repairs, we value your direct feedback."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "reviews__actions",
						children: [/* @__PURE__ */ jsxs("a", {
							href: GOOGLE_REVIEW_URL,
							className: "reviews__btn reviews__btn--primary",
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": "Write a Google Review for JSR EV Spare Parts (opens in a new tab)",
							children: [/* @__PURE__ */ jsx("svg", {
								className: "reviews__btn-icon",
								width: "18",
								height: "18",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": "true",
								focusable: "false",
								children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" })
							}), /* @__PURE__ */ jsx("span", { children: "Write a Google Review" })]
						}), /* @__PURE__ */ jsxs("a", {
							href: GOOGLE_PROFILE_URL,
							className: "reviews__btn reviews__btn--secondary",
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": "Read all Google reviews for JSR EV Spare Parts (opens in a new tab)",
							children: [/* @__PURE__ */ jsxs("svg", {
								className: "reviews__btn-icon",
								width: "18",
								height: "18",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								"aria-hidden": "true",
								focusable: "false",
								children: [
									/* @__PURE__ */ jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
									/* @__PURE__ */ jsx("polyline", { points: "15 3 21 3 21 9" }),
									/* @__PURE__ */ jsx("line", {
										x1: "10",
										y1: "14",
										x2: "21",
										y2: "3"
									})
								]
							}), /* @__PURE__ */ jsx("span", { children: "Read All Reviews" })]
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "reviews__note",
						children: "Your review will open on Google, where you can choose your rating and write your own feedback."
					})
				]
			})]
		})
	});
}
// src/FAQ.jsx
var faqItems = [
	{
		id: "location",
		question: "Where is JSR EV Spare Parts located in Rohini?",
		answer: "Our physical shop is located in Sector 18, Rohini, Delhi – 110089 (near Data Ram Apartment). You can visit our store directly for spare parts purchase, repair advice, and fitting services."
	},
	{
		id: "parts-range",
		question: "Which electric vehicle spare parts do you sell?",
		answer: "We stock spare parts for e-rickshaws and electric scooters, including motors, controllers, battery chargers, differentials, brake shoes, shockers, tyres, wiring kits, DC converters, headlights, tail lights, and accelerators."
	},
	{
		id: "repair-fitting",
		question: "Do you provide repair and fitting services at the shop?",
		answer: "Yes. In addition to spare parts sales, we provide repairs and parts fitting at our Sector 18 shop as well as visits to your location."
	},
	{
		id: "hours",
		question: "What are your shop timings?",
		answer: "Our shop is open every day from 8:00 AM to 8:00 PM, serving customers across Rohini, Badli, and North Delhi."
	},
	{
		id: "availability",
		question: "How can I check if a spare part is currently in stock?",
		answer: "You can call us directly at +91 9990120067 or send a WhatsApp message with the name or photo of the part you need for an immediate availability check and price quote."
	},
	{
		id: "buy-rohini",
		question: "Where can I buy e-rickshaw spare parts in Rohini?",
		answer: "You can buy parts directly at our Sector 18 shop, available at both retail and wholesale prices. Call or WhatsApp us on +91 9990120067 for wholesale rates."
	},
	{
		id: "scooter-parts",
		question: "Which electric scooter parts do you stock?",
		answer: "For electric scooters, we stock controllers, battery chargers, lights, and accelerators."
	},
	{
		id: "motor-repair",
		question: "Do you offer e-rickshaw motor repair in Delhi?",
		answer: "Yes, we handle motor repair along with complete servicing and parts fitting for electric rickshaws."
	},
	{
		id: "battery-packs",
		question: "Do you supply complete battery packs and chargers?",
		answer: "Yes, we supply complete battery packs as well as e-rickshaw battery chargers."
	},
	{
		id: "wholesale-supply",
		question: "Do you supply wholesale e-rickshaw spare parts in Delhi?",
		answer: "Yes, JSR EV Spare Parts supplies e-rickshaw components at wholesale rates to local mechanics, workshops, and commercial fleet owners across Rohini, Badli, and North Delhi. Call or WhatsApp +91 9990120067 for wholesale order assistance."
	},
	{
		id: "motor-controller-compatibility",
		question: "What e-rickshaw motor and controller voltages do you support?",
		answer: "We stock 48V and 60V brushless DC (BLDC) motors and matching heavy-duty speed controllers compatible with major e-rickshaw models in Delhi, along with copper wiring kits and throttle accelerators."
	},
	{
		id: "same-day-fitting",
		question: "Can I get same-day parts fitting and replacement in Rohini?",
		answer: "Yes. Our physical workshop in Sector 18, Rohini provides fast, same-day component inspection, replacement, and fitting services so drivers and operators minimize vehicle downtime."
	}
];
function FAQ() {
	const [openId, setOpenId] = useState("location");
	const toggleItem = (id) => {
		setOpenId((prev) => prev === id ? null : id);
	};
	return /* @__PURE__ */ jsx("section", {
		className: "faq",
		id: "faq",
		"aria-labelledby": "faq-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container faq__inner",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "faq__header reveal-up",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "faq__badge-row",
						children: [/* @__PURE__ */ jsx("span", {
							className: "faq__badge",
							children: "FREQUENTLY ASKED QUESTIONS"
						}), /* @__PURE__ */ jsx("span", {
							className: "faq__badge-line",
							"aria-hidden": "true"
						})]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "faq__heading",
						id: "faq-heading",
						children: "Got Questions About EV Spare Parts?"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "faq__heading-accent",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "faq__subtitle",
						children: "Reliable information on spare parts, shop location, timings, and fitting services in Rohini, Delhi."
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "faq__list reveal-up",
				children: faqItems.map((item) => {
					const isOpen = openId === item.id;
					const headingId = `faq-h-${item.id}`;
					const panelId = `faq-p-${item.id}`;
					return /* @__PURE__ */ jsxs("div", {
						className: `faq__item ${isOpen ? "faq__item--open" : ""}`,
						children: [/* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							className: "faq__trigger",
							"aria-expanded": isOpen,
							"aria-controls": panelId,
							id: headingId,
							onClick: () => toggleItem(item.id),
							children: [/* @__PURE__ */ jsx("span", {
								className: "faq__question-text",
								children: item.question
							}), /* @__PURE__ */ jsx("span", {
								className: "faq__icon",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("svg", {
									className: "faq__chevron",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									focusable: "false",
									children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" })
								})
							})]
						}) }), /* @__PURE__ */ jsx("div", {
							id: panelId,
							role: "region",
							"aria-labelledby": headingId,
							className: `faq__panel ${isOpen ? "faq__panel--open" : ""}`,
							children: /* @__PURE__ */ jsx("div", {
								className: "faq__panel-inner",
								children: item.id === "buy-rohini" ? /* @__PURE__ */ jsxs("p", {
									className: "faq__answer",
									children: [
										"You can buy parts directly at our Sector 18 shop, available at both retail and wholesale prices.",
										" ",
										/* @__PURE__ */ jsx("a", {
											href: "tel:+919990120067",
											className: "faq__link",
											children: "Call"
										}),
										" or",
										" ",
										/* @__PURE__ */ jsx("a", {
											href: "https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20wholesale%20rates.",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "faq__link",
											"aria-label": "WhatsApp enquiry for wholesale rates (opens in a new tab)",
											children: "WhatsApp"
										}),
										" ",
										"us on",
										" ",
										/* @__PURE__ */ jsx("a", {
											href: "tel:+919990120067",
											className: "faq__link",
											children: "+91 9990120067"
										}),
										" ",
										"for wholesale rates."
									]
								}) : /* @__PURE__ */ jsx("p", {
									className: "faq__answer",
									children: item.answer
								})
							})
						})]
					}, item.id);
				})
			})]
		})
	});
}
// src/StoreLocation.jsx
function StoreLocation() {
	const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=JSR+EV+SPARE+PARTS&destination_place_id=ChIJ531MOEEB3TkRIZ4aIUZvT4g";
	const mapsSearchUrl = "https://www.google.com/maps/search/?api=1&query=JSR+EV+SPARE+PARTS+Rohini+Sector+18+Delhi";
	return /* @__PURE__ */ jsx("section", {
		className: "store-location",
		id: "contact",
		"aria-labelledby": "store-location-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container store-location__inner",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "store-location__header reveal-up",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "store-location__eyebrow-row",
						children: [/* @__PURE__ */ jsx("span", {
							className: "store-location__eyebrow",
							children: "FIND OUR STORE"
						}), /* @__PURE__ */ jsx("span", {
							className: "store-location__eyebrow-line",
							"aria-hidden": "true"
						})]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "store-location__heading",
						id: "store-location-heading",
						children: "Visit Our Store"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "store-location__subtitle",
						children: "Find genuine E-Rickshaw spare parts at JSR EV SPARE PARTS."
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "store-location__layout",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "store-location__card reveal-left",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "store-location__brand-meta",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "store-location__badge-row",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "store-location__badge",
										children: [/* @__PURE__ */ jsx("span", {
											className: "store-location__badge-pulse",
											"aria-hidden": "true"
										}), "Store Open"]
									}), /* @__PURE__ */ jsx("span", {
										className: "store-location__badge",
										children: "Sector 18 Rohini"
									})]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "store-location__name",
									children: "JSR EV SPARE PARTS"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "store-location__business-type",
									children: "E-Rickshaw & EV Spare Parts"
								})
							]
						}),
						/* @__PURE__ */ jsxs("ul", {
							className: "store-location__info-list",
							children: [
								/* @__PURE__ */ jsxs("li", {
									className: "store-location__info-item",
									children: [/* @__PURE__ */ jsx("span", {
										className: "store-location__info-icon",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsxs("svg", {
											width: "22",
											height: "22",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2.2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [/* @__PURE__ */ jsx("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }), /* @__PURE__ */ jsx("circle", {
												cx: "12",
												cy: "10",
												r: "3"
											})]
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "store-location__info-content",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "store-location__info-label",
												children: "Location"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "store-location__info-value",
												children: "Rohini Sector 18, Delhi, India"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "store-location__info-sub",
												children: "Sector 18, Near Data Ram Apartment, Rohini – 110089"
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs("li", {
									className: "store-location__info-item",
									children: [/* @__PURE__ */ jsx("span", {
										className: "store-location__info-icon",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsx("svg", {
											width: "22",
											height: "22",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2.2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "store-location__info-content",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "store-location__info-label",
												children: "Phone"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "store-location__info-value",
												children: /* @__PURE__ */ jsx("a", {
													href: "tel:9990120067",
													className: "store-location__phone-link",
													"aria-label": "Call JSR EV SPARE PARTS at 9990120067",
													children: "+91 9990120067"
												})
											}),
											/* @__PURE__ */ jsx("p", {
												className: "store-location__info-sub",
												children: "Call for instant spare parts availability & prices"
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs("li", {
									className: "store-location__info-item",
									children: [/* @__PURE__ */ jsx("span", {
										className: "store-location__info-icon",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsxs("svg", {
											width: "22",
											height: "22",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2.2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [/* @__PURE__ */ jsx("circle", {
												cx: "12",
												cy: "12",
												r: "10"
											}), /* @__PURE__ */ jsx("polyline", { points: "12 6 12 12 16 14" })]
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "store-location__info-content",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "store-location__info-label",
												children: "Store Hours"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "store-location__info-value",
												children: "8:00 AM – 8:00 PM"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "store-location__info-sub store-location__highlight-open",
												children: "Open every day (Monday to Sunday)"
											})
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "store-location__actions",
							children: [
								/* @__PURE__ */ jsxs("a", {
									href: directionsUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "store-location__btn store-location__btn--directions",
									"aria-label": "Get directions to JSR EV SPARE PARTS on Google Maps (opens in new tab)",
									children: [/* @__PURE__ */ jsx("svg", {
										width: "19",
										height: "19",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.4",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsx("polygon", { points: "3 11 22 2 13 21 11 13 3 11" })
									}), /* @__PURE__ */ jsx("span", { children: "Get Directions" })]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "tel:9990120067",
									className: "store-location__btn store-location__btn--call",
									"aria-label": "Call 9990120067",
									children: [/* @__PURE__ */ jsx("svg", {
										width: "17",
										height: "17",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
									}), /* @__PURE__ */ jsx("span", { children: "Call Now" })]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "https://wa.me/919990120067?text=Hi%20JSR%20EV%20SPARE%20PARTS%2C%20I%20am%20looking%20for%20e-rickshaw%20parts%20and%20would%20like%20directions%20to%20your%20shop.",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "store-location__btn store-location__btn--whatsapp",
									"aria-label": "Message JSR EV SPARE PARTS on WhatsApp (opens in new tab)",
									children: [/* @__PURE__ */ jsxs("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "currentColor",
										"aria-hidden": "true",
										children: [/* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }), /* @__PURE__ */ jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" })]
									}), /* @__PURE__ */ jsx("span", { children: "WhatsApp" })]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: GOOGLE_REVIEW_URL,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "store-location__btn store-location__btn--review",
									"aria-label": "Leave a Google review for JSR EV SPARE PARTS (opens in new tab)",
									children: [/* @__PURE__ */ jsx("span", {
										className: "store-location__review-stars",
										"aria-hidden": "true",
										children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", {
											width: "15",
											height: "15",
											viewBox: "0 0 24 24",
											fill: "currentColor",
											children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" })
										}, i))
									}), /* @__PURE__ */ jsx("span", { children: "Leave a Google Review" })]
								})
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "store-location__map-container reveal-right",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "store-location__map-floating-chip",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ jsx("span", { className: "store-location__chip-dot" }), /* @__PURE__ */ jsx("span", { children: "JSR EV SPARE PARTS • Rohini" })]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "store-location__map-frame-wrap",
							children: /* @__PURE__ */ jsx("iframe", {
								src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.3269826598416!2d77.1343859!3d28.739652799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01c1384c7de7%3A0x884f6f46221a9e21!2sJSR%20EV%20SPARE%20PARTS!5e0!3m2!1sen!2sin!4v1794570154140!5m2!1sen!2sin",
								title: "Google Maps location of JSR EV SPARE PARTS in Rohini Sector 18",
								className: "store-location__iframe",
								style: { border: 0 },
								allowFullScreen: "",
								loading: "lazy",
								referrerPolicy: "strict-origin-when-cross-origin"
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "store-location__map-bar",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "store-location__map-bar-text",
								children: [/* @__PURE__ */ jsxs("svg", {
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									className: "store-location__map-bar-icon",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ jsx("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }), /* @__PURE__ */ jsx("circle", {
										cx: "12",
										cy: "10",
										r: "3"
									})]
								}), /* @__PURE__ */ jsx("span", { children: "Near Data Ram Apartment, Sector 18, Rohini, Delhi" })]
							}), /* @__PURE__ */ jsxs("a", {
								href: mapsSearchUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "store-location__map-bar-link",
								"aria-label": "Open shop location in Google Maps (opens in new tab)",
								children: [/* @__PURE__ */ jsx("span", { children: "View Full Map" }), /* @__PURE__ */ jsxs("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: [
										/* @__PURE__ */ jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
										/* @__PURE__ */ jsx("polyline", { points: "15 3 21 3 21 9" }),
										/* @__PURE__ */ jsx("line", {
											x1: "10",
											y1: "14",
											x2: "21",
											y2: "3"
										})
									]
								})]
							})]
						})
					]
				})]
			})]
		})
	});
}
// src/FloatingCTA.jsx
function FloatingCTA() {
	return /* @__PURE__ */ jsx("aside", {
		"aria-label": "WhatsApp quick contact",
		children: /* @__PURE__ */ jsx("a", {
			href: "https://wa.me/919990120067?text=Hi%2C%20I%20need%20an%20e-rickshaw%20spare%20part",
			target: "_blank",
			rel: "noopener noreferrer",
			className: "whatsapp-float",
			"aria-label": "Chat with JSR EV Spare Parts on WhatsApp (opens in a new tab)",
			title: "Chat on WhatsApp",
			children: /* @__PURE__ */ jsxs("svg", {
				width: "32",
				height: "32",
				viewBox: "0 0 24 24",
				fill: "currentColor",
				"aria-hidden": "true",
				focusable: "false",
				children: [/* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }), /* @__PURE__ */ jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" })]
			})
		})
	});
}
// src/BackToTop.jsx
function BackToTop() {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const handleScroll = () => {
			const isPast = window.scrollY > 550;
			setVisible((prev) => prev !== isPast ? isPast : prev);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
		});
	};
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: `back-to-top${visible ? " back-to-top--visible" : ""}`,
		onClick: scrollToTop,
		"aria-label": "Back to top",
		tabIndex: visible ? 0 : -1,
		children: /* @__PURE__ */ jsx("svg", {
			width: "20",
			height: "20",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "m18 15-6-6-6 6" })
		})
	});
}
// src/Footer.jsx
var quickLinks = [
	{
		id: "home",
		href: "/#home",
		label: "Home"
	},
	{
		id: "services",
		href: "/#services",
		label: "Our Services"
	},
	{
		id: "why-us",
		href: "/#why-choose-us",
		label: "Why Choose Us"
	},
	{
		id: "about",
		href: "/#about",
		label: "About Our Shop"
	},
	{
		id: "reviews",
		href: "/#reviews",
		label: "Customer Reviews"
	},
	{
		id: "faq",
		href: "/#faq",
		label: "FAQ"
	},
	{
		id: "contact",
		href: "/#contact",
		label: "Contact"
	}
];
var serviceHighlights = [
	{
		id: "erickshaw",
		lines: ["E-Rickshaw", "Parts"],
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#39D000",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("path", { d: "M19 17h2v-3.34a4 4 0 0 0-1.17-2.83L17 8h-4v9h2" }),
				/* @__PURE__ */ jsx("path", { d: "M5 17H3v-5l2-4h6v9H7" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "7",
					cy: "17",
					r: "2"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "17",
					cy: "17",
					r: "2"
				})
			]
		})
	},
	{
		id: "scooter",
		lines: ["Scooter", "Parts"],
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#39D000",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "6",
					cy: "18",
					r: "3"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "18",
					cy: "18",
					r: "3"
				}),
				/* @__PURE__ */ jsx("path", { d: "M9 18h6" }),
				/* @__PURE__ */ jsx("path", { d: "M12 9v9" }),
				/* @__PURE__ */ jsx("path", { d: "m14 5-2 4-2-4" }),
				/* @__PURE__ */ jsx("path", { d: "M8 5h8" })
			]
		})
	},
	{
		id: "repair",
		lines: ["Repair &", "Fitting"],
		icon: /* @__PURE__ */ jsx("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#39D000",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
		})
	},
	{
		id: "wholesale",
		lines: ["Wholesale", "& Retail"],
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#39D000",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("path", { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
				/* @__PURE__ */ jsx("line", {
					x1: "3",
					y1: "6",
					x2: "21",
					y2: "6"
				}),
				/* @__PURE__ */ jsx("path", { d: "M16 10a4 4 0 0 1-8 0" })
			]
		})
	}
];
var socialLinks = [
	{
		id: "facebook",
		label: "Facebook",
		href: "https://www.facebook.com/jsrevspareparts",
		ariaLabel: "JSR EV Spare Parts on Facebook",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "20",
			height: "20",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
		})
	},
	{
		id: "instagram",
		label: "Instagram",
		href: "https://www.instagram.com/jsrevspareparts",
		ariaLabel: "JSR EV Spare Parts on Instagram",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "20",
			height: "20",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: [
				/* @__PURE__ */ jsx("rect", {
					width: "20",
					height: "20",
					x: "2",
					y: "2",
					rx: "5",
					ry: "5"
				}),
				/* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
				/* @__PURE__ */ jsx("line", {
					x1: "17.5",
					x2: "17.51",
					y1: "6.5",
					y2: "6.5"
				})
			]
		})
	},
	{
		id: "google",
		label: "Google",
		href: GOOGLE_PROFILE_URL,
		ariaLabel: "JSR EV Spare Parts on Google",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "20",
			height: "20",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" })
		})
	},
	{
		id: "whatsapp",
		label: "WhatsApp",
		href: "https://wa.me/919990120067?text=Hi%2C%20I%20need%20an%20e-rickshaw%20spare%20part",
		ariaLabel: "JSR EV Spare Parts on WhatsApp",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "20",
			height: "20",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }), /* @__PURE__ */ jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" })]
		})
	}
];
function FooterHeading({ title, isAccordion, isOpen, onToggle, panelId }) {
	return /* @__PURE__ */ jsx("div", {
		className: "site-footer__heading-group",
		children: isAccordion ? /* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "site-footer__heading-btn",
			onClick: onToggle,
			"aria-expanded": isOpen,
			"aria-controls": panelId,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "site-footer__heading-title-wrap",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "site-footer__heading",
					children: title
				}), /* @__PURE__ */ jsx("span", {
					className: "site-footer__heading-bar",
					"aria-hidden": "true"
				})]
			}), /* @__PURE__ */ jsx("svg", {
				className: `site-footer__chevron ${isOpen ? "site-footer__chevron--open" : ""}`,
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" })
			})]
		}) : /* @__PURE__ */ jsxs("div", {
			className: "site-footer__heading-title-wrap",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "site-footer__heading",
				children: title
			}), /* @__PURE__ */ jsx("span", {
				className: "site-footer__heading-bar",
				"aria-hidden": "true"
			})]
		})
	});
}
function Footer() {
	const [openAccordions, setOpenAccordions] = useState({
		links: false,
		contact: true
	});
	const toggleAccordion = (key) => {
		setOpenAccordions((prev) => ({
			...prev,
			[key]: !prev[key]
		}));
	};
	return /* @__PURE__ */ jsxs("footer", {
		className: "site-footer",
		role: "contentinfo",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "site-footer__bg-vehicle",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "site-footer__bg-typography",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "site-footer__bg-text",
					children: [/* @__PURE__ */ jsx("span", {
						className: "site-footer__bg-text-desktop",
						children: "JSR EV SPARE PARTS"
					}), /* @__PURE__ */ jsxs("span", {
						className: "site-footer__bg-text-mobile",
						children: [/* @__PURE__ */ jsx("span", { children: "JSR EV" }), /* @__PURE__ */ jsx("span", { children: "SPARE PARTS" })]
					})]
				}), /* @__PURE__ */ jsxs("svg", {
					className: "site-footer__bg-curves",
					viewBox: "0 0 1440 280",
					fill: "none",
					preserveAspectRatio: "none",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("linearGradient", {
							id: "footerSwooshLeft",
							x1: "0%",
							y1: "100%",
							x2: "100%",
							y2: "0%",
							children: [
								/* @__PURE__ */ jsx("stop", {
									offset: "0%",
									stopColor: "#39D000",
									stopOpacity: "0"
								}),
								/* @__PURE__ */ jsx("stop", {
									offset: "35%",
									stopColor: "#39D000",
									stopOpacity: "0.9"
								}),
								/* @__PURE__ */ jsx("stop", {
									offset: "85%",
									stopColor: "#39D000",
									stopOpacity: "0.45"
								}),
								/* @__PURE__ */ jsx("stop", {
									offset: "100%",
									stopColor: "#39D000",
									stopOpacity: "0"
								})
							]
						}), /* @__PURE__ */ jsxs("linearGradient", {
							id: "footerSwooshRight",
							x1: "0%",
							y1: "0%",
							x2: "100%",
							y2: "100%",
							children: [
								/* @__PURE__ */ jsx("stop", {
									offset: "0%",
									stopColor: "#39D000",
									stopOpacity: "0"
								}),
								/* @__PURE__ */ jsx("stop", {
									offset: "45%",
									stopColor: "#39D000",
									stopOpacity: "0.9"
								}),
								/* @__PURE__ */ jsx("stop", {
									offset: "90%",
									stopColor: "#39D000",
									stopOpacity: "0.35"
								}),
								/* @__PURE__ */ jsx("stop", {
									offset: "100%",
									stopColor: "#39D000",
									stopOpacity: "0"
								})
							]
						})] }),
						/* @__PURE__ */ jsx("path", {
							d: "M -40 220 C 140 185, 310 245, 520 180",
							stroke: "url(#footerSwooshLeft)",
							strokeWidth: "3.5",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ jsx("path", {
							d: "M 920 115 C 1110 65, 1280 155, 1480 120",
							stroke: "url(#footerSwooshRight)",
							strokeWidth: "3.5",
							strokeLinecap: "round"
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "site-footer__overlay",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "sr-only",
				children: "Footer Information"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container site-footer__inner",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "site-footer__grid reveal-stagger",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "site-footer__col site-footer__col--brand reveal-up",
								children: [
									/* @__PURE__ */ jsx("a", {
										className: "site-footer__logo",
										href: "/",
										"aria-label": "JSR EV SPARE PARTS — back to home",
										children: /* @__PURE__ */ jsx("img", {
											src: "/jsr-logo-footer.png",
											alt: "JSR EV Spare Parts logo",
											className: "site-footer__logo-img",
											width: "168",
											height: "56",
											loading: "lazy",
											decoding: "async"
										})
									}),
									/* @__PURE__ */ jsx("p", {
										className: "site-footer__description",
										children: "Spare parts, repair and fitting services for e-rickshaws and electric scooters in Sector 18, Rohini, Delhi."
									}),
									/* @__PURE__ */ jsx("div", {
										className: "site-footer__services-grid",
										role: "list",
										"aria-label": "Our core offerings",
										children: serviceHighlights.map((service) => /* @__PURE__ */ jsxs("div", {
											className: "site-footer__service-card",
											role: "listitem",
											children: [/* @__PURE__ */ jsx("div", {
												className: "site-footer__service-icon",
												"aria-hidden": "true",
												children: service.icon
											}), /* @__PURE__ */ jsx("span", {
												className: "site-footer__service-label",
												children: service.lines.map((line, i) => /* @__PURE__ */ jsx("span", {
													className: "site-footer__service-line",
													children: line
												}, i))
											})]
										}, service.id))
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "site-footer__accordion-card",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "site-footer__col site-footer__col--links site-footer__accordion-section reveal-up",
										children: [/* @__PURE__ */ jsx(FooterHeading, {
											title: "Quick Links",
											isAccordion: true,
											isOpen: openAccordions.links,
											onToggle: () => toggleAccordion("links"),
											panelId: "footer-panel-links"
										}), /* @__PURE__ */ jsx("div", {
											id: "footer-panel-links",
											className: `site-footer__accordion-content ${openAccordions.links ? "site-footer__accordion-content--open" : ""}`,
											children: /* @__PURE__ */ jsx("nav", {
												className: "site-footer__links-nav",
												"aria-label": "Quick Links",
												children: /* @__PURE__ */ jsx("ul", {
													className: "site-footer__links-list",
													children: quickLinks.map((link) => /* @__PURE__ */ jsx("li", {
														className: "site-footer__link-item",
														children: /* @__PURE__ */ jsxs("a", {
															href: link.href,
															className: "site-footer__link",
															children: [/* @__PURE__ */ jsx("span", {
																className: "site-footer__link-arrow",
																"aria-hidden": "true",
																children: "›"
															}), /* @__PURE__ */ jsx("span", {
																className: "site-footer__link-text",
																children: link.label
															})]
														})
													}, link.id))
												})
											})
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "site-footer__accordion-divider",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "site-footer__col site-footer__col--contact site-footer__accordion-section reveal-up",
										children: [/* @__PURE__ */ jsx(FooterHeading, {
											title: "Contact & Timings",
											isAccordion: true,
											isOpen: openAccordions.contact,
											onToggle: () => toggleAccordion("contact"),
											panelId: "footer-panel-contact"
										}), /* @__PURE__ */ jsx("div", {
											id: "footer-panel-contact",
											className: `site-footer__accordion-content ${openAccordions.contact ? "site-footer__accordion-content--open" : ""}`,
											children: /* @__PURE__ */ jsxs("address", {
												className: "site-footer__contact-info",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "site-footer__contact-row",
														children: [/* @__PURE__ */ jsx("span", {
															className: "site-footer__icon-badge site-footer__icon-badge--blue",
															"aria-hidden": "true",
															children: /* @__PURE__ */ jsx("svg", {
																width: "15",
																height: "15",
																viewBox: "0 0 24 24",
																fill: "none",
																stroke: "currentColor",
																strokeWidth: "2.2",
																strokeLinecap: "round",
																strokeLinejoin: "round",
																children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
															})
														}), /* @__PURE__ */ jsx("a", {
															href: "tel:+919990120067",
															className: "site-footer__contact-link site-footer__contact-link--tel",
															children: "Call: +91 9990120067"
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "site-footer__contact-row",
														children: [/* @__PURE__ */ jsx("span", {
															className: "site-footer__icon-badge site-footer__icon-badge--green",
															"aria-hidden": "true",
															children: /* @__PURE__ */ jsxs("svg", {
																width: "15",
																height: "15",
																viewBox: "0 0 24 24",
																fill: "currentColor",
																children: [/* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }), /* @__PURE__ */ jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" })]
															})
														}), /* @__PURE__ */ jsx("a", {
															href: "https://wa.me/919990120067?text=Hi%2C%20I%20need%20an%20e-rickshaw%20spare%20part",
															target: "_blank",
															rel: "noopener noreferrer",
															className: "site-footer__contact-link site-footer__contact-link--whatsapp",
															"aria-label": "Chat with JSR EV Spare Parts on WhatsApp",
															children: "WhatsApp: +91 9990120067"
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "site-footer__contact-row",
														children: [/* @__PURE__ */ jsx("span", {
															className: "site-footer__icon-badge site-footer__icon-badge--blue",
															"aria-hidden": "true",
															children: /* @__PURE__ */ jsxs("svg", {
																width: "15",
																height: "15",
																viewBox: "0 0 24 24",
																fill: "none",
																stroke: "currentColor",
																strokeWidth: "2.2",
																strokeLinecap: "round",
																strokeLinejoin: "round",
																children: [/* @__PURE__ */ jsx("rect", {
																	width: "20",
																	height: "16",
																	x: "2",
																	y: "4",
																	rx: "2"
																}), /* @__PURE__ */ jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })]
															})
														}), /* @__PURE__ */ jsx("a", {
															href: "mailto:admin@jsrevtech.in",
															className: "site-footer__contact-link site-footer__contact-link--email",
															children: "admin@jsrevtech.in"
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "site-footer__contact-row",
														children: [/* @__PURE__ */ jsx("span", {
															className: "site-footer__icon-badge site-footer__icon-badge--blue",
															"aria-hidden": "true",
															children: /* @__PURE__ */ jsxs("svg", {
																width: "15",
																height: "15",
																viewBox: "0 0 24 24",
																fill: "none",
																stroke: "currentColor",
																strokeWidth: "2.2",
																strokeLinecap: "round",
																strokeLinejoin: "round",
																children: [/* @__PURE__ */ jsx("path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }), /* @__PURE__ */ jsx("circle", {
																	cx: "12",
																	cy: "10",
																	r: "3"
																})]
															})
														}), /* @__PURE__ */ jsxs("a", {
															href: "https://maps.google.com/?q=Sector+18+Rohini+Delhi",
															target: "_blank",
															rel: "noopener noreferrer",
															className: "site-footer__contact-text site-footer__contact-link",
															"aria-label": "Open JSR EV Spare Parts address in Google Maps",
															children: [
																"Sector 18, Near Data Ram Apartment",
																/* @__PURE__ */ jsx("br", {}),
																/* @__PURE__ */ jsx("span", {
																	className: "site-footer__text-muted",
																	children: "Rohini, Delhi – 110089"
																})
															]
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "site-footer__contact-row",
														children: [/* @__PURE__ */ jsx("span", {
															className: "site-footer__icon-badge site-footer__icon-badge--blue",
															"aria-hidden": "true",
															children: /* @__PURE__ */ jsxs("svg", {
																width: "15",
																height: "15",
																viewBox: "0 0 24 24",
																fill: "none",
																stroke: "currentColor",
																strokeWidth: "2.2",
																strokeLinecap: "round",
																strokeLinejoin: "round",
																children: [/* @__PURE__ */ jsx("circle", {
																	cx: "12",
																	cy: "12",
																	r: "10"
																}), /* @__PURE__ */ jsx("polyline", { points: "12 6 12 12 16 14" })]
															})
														}), /* @__PURE__ */ jsxs("div", {
															className: "site-footer__contact-text",
															children: [
																/* @__PURE__ */ jsx("span", { children: "8:00 AM – 8:00 PM" }),
																/* @__PURE__ */ jsx("br", {}),
																/* @__PURE__ */ jsx("span", {
																	className: "site-footer__text-accent",
																	children: "Open every day"
																})
															]
														})]
													})
												]
											})
										})]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "site-footer__col site-footer__col--social site-footer__social-card reveal-up",
								children: [/* @__PURE__ */ jsx(FooterHeading, {
									title: "Follow Us",
									isAccordion: false
								}), /* @__PURE__ */ jsx("nav", {
									className: "site-footer__social-wrap",
									"aria-label": "Follow Us",
									children: /* @__PURE__ */ jsx("div", {
										className: "site-footer__social-row",
										children: socialLinks.map((item) => /* @__PURE__ */ jsx("a", {
											href: item.href,
											className: "site-footer__social-btn",
											"aria-label": item.ariaLabel,
											target: "_blank",
											rel: "noopener noreferrer",
											children: item.icon
										}, item.id))
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "site-footer__wordmark-band reveal-up",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ jsx("div", {
							className: "site-footer__wordmark-text",
							children: "JSR EV SPARE PARTS"
						}), /* @__PURE__ */ jsxs("svg", {
							className: "site-footer__wordmark-curves",
							viewBox: "0 0 1440 160",
							fill: "none",
							preserveAspectRatio: "none",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("linearGradient", {
									id: "wordmarkSwooshLeft",
									x1: "0%",
									y1: "100%",
									x2: "100%",
									y2: "0%",
									children: [
										/* @__PURE__ */ jsx("stop", {
											offset: "0%",
											stopColor: "#39D000",
											stopOpacity: "0"
										}),
										/* @__PURE__ */ jsx("stop", {
											offset: "35%",
											stopColor: "#39D000",
											stopOpacity: "0.9"
										}),
										/* @__PURE__ */ jsx("stop", {
											offset: "85%",
											stopColor: "#39D000",
											stopOpacity: "0.45"
										}),
										/* @__PURE__ */ jsx("stop", {
											offset: "100%",
											stopColor: "#39D000",
											stopOpacity: "0"
										})
									]
								}), /* @__PURE__ */ jsxs("linearGradient", {
									id: "wordmarkSwooshRight",
									x1: "0%",
									y1: "0%",
									x2: "100%",
									y2: "100%",
									children: [
										/* @__PURE__ */ jsx("stop", {
											offset: "0%",
											stopColor: "#39D000",
											stopOpacity: "0"
										}),
										/* @__PURE__ */ jsx("stop", {
											offset: "45%",
											stopColor: "#39D000",
											stopOpacity: "0.9"
										}),
										/* @__PURE__ */ jsx("stop", {
											offset: "90%",
											stopColor: "#39D000",
											stopOpacity: "0.35"
										}),
										/* @__PURE__ */ jsx("stop", {
											offset: "100%",
											stopColor: "#39D000",
											stopOpacity: "0"
										})
									]
								})] }),
								/* @__PURE__ */ jsx("path", {
									d: "M -40 120 C 160 95, 310 140, 520 90",
									stroke: "url(#wordmarkSwooshLeft)",
									strokeWidth: "3.5",
									strokeLinecap: "round"
								}),
								/* @__PURE__ */ jsx("path", {
									d: "M 920 65 C 1110 25, 1270 95, 1480 70",
									stroke: "url(#wordmarkSwooshRight)",
									strokeWidth: "3.5",
									strokeLinecap: "round"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "site-footer__bottom reveal-up",
						children: [/* @__PURE__ */ jsx("div", {
							className: "site-footer__tagline-row",
							children: /* @__PURE__ */ jsx("p", {
								className: "site-footer__tagline-hi",
								lang: "hi",
								children: "ई-रिक्शा और इलेक्ट्रिक स्कूटर स्पेयर पार्ट्स – सेक्टर 18, रोहिणी, दिल्ली"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "site-footer__bottom-row",
							children: [/* @__PURE__ */ jsx("p", {
								className: "site-footer__copyright",
								children: "© 2026 JSR EV Spare Parts. All rights reserved."
							}), /* @__PURE__ */ jsxs("nav", {
								className: "site-footer__legal-links",
								"aria-label": "Legal links",
								children: [
									/* @__PURE__ */ jsx("a", {
										href: "/privacy",
										className: "site-footer__legal-link",
										children: "Privacy Policy"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "site-footer__legal-divider",
										"aria-hidden": "true",
										children: "|"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "/terms",
										className: "site-footer__legal-link",
										children: "Terms & Conditions"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "site-footer__legal-divider",
										"aria-hidden": "true",
										children: "|"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "/refund",
										className: "site-footer__legal-link",
										children: "Refund Policy"
									})
								]
							})]
						})]
					})
				]
			})
		]
	});
}
// src/NotFound.jsx
function NotFound() {
	return /* @__PURE__ */ jsxs("main", {
		className: "nf",
		"aria-labelledby": "nf-heading",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "nf__bg",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("span", { className: "nf__spark nf__spark--1" }),
				/* @__PURE__ */ jsx("span", { className: "nf__spark nf__spark--2" }),
				/* @__PURE__ */ jsx("span", { className: "nf__spark nf__spark--3" }),
				/* @__PURE__ */ jsx("span", { className: "nf__spark nf__spark--4" })
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "nf__card",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "nf__icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsxs("svg", {
						viewBox: "0 0 64 64",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						children: [/* @__PURE__ */ jsx("circle", {
							cx: "32",
							cy: "32",
							r: "30",
							stroke: "#1746CE",
							strokeWidth: "3"
						}), /* @__PURE__ */ jsx("path", {
							d: "M36 10L18 36h14l-4 18L50 28H36L40 10z",
							fill: "#65D510",
							stroke: "#1746CE",
							strokeWidth: "1.5",
							strokeLinejoin: "round"
						})]
					})
				}),
				/* @__PURE__ */ jsx("p", {
					className: "nf__code",
					"aria-hidden": "true",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "nf__heading",
					id: "nf-heading",
					children: "Page Not Found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "nf__sub",
					children: "Looks like this part isn't in our stock! The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "nf__actions",
					children: [/* @__PURE__ */ jsxs("a", {
						href: "/",
						className: "nf__btn nf__btn--primary",
						children: [/* @__PURE__ */ jsxs("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							"aria-hidden": "true",
							focusable: "false",
							children: [/* @__PURE__ */ jsx("path", {
								d: "M3 12L12 3l9 9",
								stroke: "currentColor",
								strokeWidth: "2.2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}), /* @__PURE__ */ jsx("path", {
								d: "M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9",
								stroke: "currentColor",
								strokeWidth: "2.2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})]
						}), "Back to Home"]
					}), /* @__PURE__ */ jsxs("a", {
						href: "/#contact",
						className: "nf__btn nf__btn--secondary",
						children: [/* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							"aria-hidden": "true",
							focusable: "false",
							children: /* @__PURE__ */ jsx("path", {
								d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						}), "Contact Us"]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "nf__brand",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "nf__brand-name",
							children: "JSR EV"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "nf__brand-sep",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "nf__brand-tag",
							children: "SPARE PARTS"
						})
					]
				})
			]
		})]
	});
}
// src/PrivacyPolicy.jsx
function PrivacyPolicy() {
	return /* @__PURE__ */ jsx("main", {
		className: "legal-page",
		"aria-labelledby": "privacy-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container legal-page__container",
			children: [
				/* @__PURE__ */ jsxs("nav", {
					className: "legal-page__breadcrumb",
					"aria-label": "Breadcrumb",
					children: [
						/* @__PURE__ */ jsx("a", {
							href: "/",
							className: "legal-page__breadcrumb-link",
							children: "Home"
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: "legal-page__breadcrumb-sep",
							children: "/"
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-current": "page",
							children: "Privacy Policy"
						})
					]
				}),
				/* @__PURE__ */ jsxs("header", {
					className: "legal-page__header",
					children: [/* @__PURE__ */ jsx("h1", {
						id: "privacy-heading",
						className: "legal-page__title",
						children: "Privacy Policy"
					}), /* @__PURE__ */ jsx("p", {
						className: "legal-page__updated",
						children: "Last Updated: November 2026"
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "legal-page__content",
					children: [
						/* @__PURE__ */ jsxs("p", { children: [
							"Welcome to ",
							/* @__PURE__ */ jsx("strong", { children: "JSR EV Spare Parts" }),
							" (“we”, “our”, or “us”). We operate a local retail and wholesale shop specializing in electric rickshaw (e-rickshaw) and electric scooter spare parts, located in Sector 18, Rohini, Delhi – 110089. We respect your privacy and are committed to protecting any personal information you share with us."
						] }),
						/* @__PURE__ */ jsx("h2", { children: "1. Information We Collect" }),
						/* @__PURE__ */ jsx("p", { children: "Because we operate primarily as an in-person physical store and direct phone/WhatsApp contact business, we collect only the minimal information necessary to assist with your enquiries, orders, and fitting services:" }),
						/* @__PURE__ */ jsxs("ul", { children: [
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Contact Information:" }), " Your name, phone number, and location details when you contact us via telephone, WhatsApp (+91 9990120067), or walk into our shop."] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Order & Service Details:" }), " Inquiries regarding specific e-rickshaw or scooter spare parts, vehicle model details, quotes, and fitting service requests."] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Payment Information:" }), " For in-store or UPI purchases, transaction records required for billing, accounting, and tax compliance. We do not store card numbers or banking passwords on this website."] })
						] }),
						/* @__PURE__ */ jsx("h2", { children: "2. How We Use Your Information" }),
						/* @__PURE__ */ jsx("p", { children: "We use your contact and enquiry details solely to:" }),
						/* @__PURE__ */ jsxs("ul", { children: [
							/* @__PURE__ */ jsx("li", { children: "Check part availability and provide price quotations." }),
							/* @__PURE__ */ jsx("li", { children: "Process and fulfill orders placed in person or confirmed via WhatsApp/phone." }),
							/* @__PURE__ */ jsx("li", { children: "Schedule on-site part fitting or repair assistance in Sector 18, Rohini." }),
							/* @__PURE__ */ jsx("li", { children: "Provide customer support, warranty validation, and after-sales service." })
						] }),
						/* @__PURE__ */ jsx("h2", { children: "3. Information Sharing and Disclosure" }),
						/* @__PURE__ */ jsx("p", { children: "We do not sell, rent, trade, or share your personal data with third-party marketers or brokers. We may share transaction information only when strictly necessary:" }),
						/* @__PURE__ */ jsxs("ul", { children: [/* @__PURE__ */ jsx("li", { children: "With government, tax, or legal authorities when required by applicable laws of Delhi / India." }), /* @__PURE__ */ jsx("li", { children: "With authorized manufacturer service centres if needed to process an official warranty claim on your behalf." })] }),
						/* @__PURE__ */ jsx("h2", { children: "4. Cookies & Tracking" }),
						/* @__PURE__ */ jsx("p", { children: "This website does not use tracking cookies, analytics profiling cookies, or third-party advertising trackers. Standard web server logs may temporarily capture your IP address and browser type for security and server health maintenance." }),
						/* @__PURE__ */ jsx("h2", { children: "5. Unconfirmed Business Details (Owner Verification Required)" }),
						/* @__PURE__ */ jsxs("div", {
							className: "legal-page__notice",
							role: "note",
							children: [/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", { children: "Notice for Shop Owner:" }), " The following fields should be confirmed:"] }), /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsxs("li", { children: ["Official Support Email: ", /* @__PURE__ */ jsx("em", { children: "admin@jsrevtech.in" })] }) })]
						}),
						/* @__PURE__ */ jsx("h2", { children: "6. Contact Us" }),
						/* @__PURE__ */ jsx("p", { children: "If you have any questions about this Privacy Policy or wish to update your details, please contact us:" }),
						/* @__PURE__ */ jsxs("address", {
							className: "legal-page__contact-box",
							children: [
								/* @__PURE__ */ jsx("strong", { children: "JSR EV Spare Parts" }),
								/* @__PURE__ */ jsx("br", {}),
								"Proprietor: Deepak Choudhary",
								/* @__PURE__ */ jsx("br", {}),
								"Address: Sector 18, Rohini, Delhi – 110089 (Near Data Ram Apartment)",
								/* @__PURE__ */ jsx("br", {}),
								"Phone / WhatsApp: ",
								/* @__PURE__ */ jsx("a", {
									href: "tel:+919990120067",
									children: "+91 9990120067"
								}),
								/* @__PURE__ */ jsx("br", {}),
								"Business Hours: 8:00 AM – 8:00 PM (Open 7 Days)"
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "legal-page__actions",
							children: /* @__PURE__ */ jsx("a", {
								href: "/",
								className: "legal-page__btn",
								children: "Back to Home"
							})
						})
					]
				})
			]
		})
	});
}
// src/Terms.jsx
function Terms() {
	return /* @__PURE__ */ jsx("main", {
		className: "legal-page",
		"aria-labelledby": "terms-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container legal-page__container",
			children: [
				/* @__PURE__ */ jsxs("nav", {
					className: "legal-page__breadcrumb",
					"aria-label": "Breadcrumb",
					children: [
						/* @__PURE__ */ jsx("a", {
							href: "/",
							className: "legal-page__breadcrumb-link",
							children: "Home"
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: "legal-page__breadcrumb-sep",
							children: "/"
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-current": "page",
							children: "Terms & Conditions"
						})
					]
				}),
				/* @__PURE__ */ jsxs("header", {
					className: "legal-page__header",
					children: [/* @__PURE__ */ jsx("h1", {
						id: "terms-heading",
						className: "legal-page__title",
						children: "Terms & Conditions"
					}), /* @__PURE__ */ jsx("p", {
						className: "legal-page__updated",
						children: "Last Updated: November 2026"
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "legal-page__content",
					children: [
						/* @__PURE__ */ jsxs("p", { children: [
							"These Terms & Conditions govern the sale of goods, fitting services, and use of information provided by ",
							/* @__PURE__ */ jsx("strong", { children: "JSR EV Spare Parts" }),
							", located at Sector 18, Rohini, Delhi – 110089. By purchasing spare parts, requesting repairs, or utilizing our services, you agree to comply with and be bound by these terms."
						] }),
						/* @__PURE__ */ jsx("h2", { children: "1. Business Scope & Offerings" }),
						/* @__PURE__ */ jsx("p", { children: "JSR EV Spare Parts supplies genuine parts, accessories, and maintenance solutions for commercial electric rickshaws (e-rickshaws) and electric two-wheelers (e-scooters). Our catalog includes, but is not limited to: electric motors, motor controllers, differential gears, shockers, throttle grips, wiring harnesses, brake shoes, headlights, tyres, and chargers." }),
						/* @__PURE__ */ jsx("h2", { children: "2. Quotes, Pricing & Payment" }),
						/* @__PURE__ */ jsxs("ul", { children: [
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Quotes:" }), " Prices quoted via telephone or WhatsApp are valid on the date issued and subject to market stock fluctuations."] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Pricing:" }), " All in-store purchases are billed at the prevailing retail or wholesale rate agreed at the time of sale."] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Payment Methods:" }), " We accept cash, UPI, and bank transfers as verified at our physical counter. Full payment is due upon delivery or installation of the parts."] })
						] }),
						/* @__PURE__ */ jsx("h2", { children: "3. Compatibility & Fitting Verification" }),
						/* @__PURE__ */ jsx("p", { children: "Electric rickshaw specifications (voltage, wattage, connector pinouts, shaft dimensions) vary across manufacturers. Customers and mechanics are responsible for confirming part compatibility before installation. Our staff is available on-site at Sector 18, Rohini to inspect your existing sample part or vehicle to ensure a proper match." }),
						/* @__PURE__ */ jsx("h2", { children: "4. Installation & Repair Services" }),
						/* @__PURE__ */ jsx("p", { children: "Where fitting services are provided at our shop premises:" }),
						/* @__PURE__ */ jsxs("ul", { children: [/* @__PURE__ */ jsx("li", { children: "Fitting is carried out with professional care based on standard industry practices." }), /* @__PURE__ */ jsx("li", { children: "We are not responsible for pre-existing vehicle electrical wiring faults, short circuits, or battery defects that may damage newly fitted electrical components." })] }),
						/* @__PURE__ */ jsx("h2", { children: "5. Warranty & Limitation of Liability" }),
						/* @__PURE__ */ jsxs("ul", { children: [
							/* @__PURE__ */ jsx("li", { children: "Manufacturer warranties (if provided for specific items such as motors, controllers, or chargers) are governed strictly by the respective manufacturer’s warranty policy." }),
							/* @__PURE__ */ jsx("li", { children: "Wear-and-tear items (such as brake shoes, tyres, bearings, cables, and cosmetic plastics) are not covered under warranty once used." }),
							/* @__PURE__ */ jsx("li", { children: "To the maximum extent permitted by applicable law, our total liability is limited to the purchase price paid for the specific part." })
						] }),
						/* @__PURE__ */ jsx("h2", { children: "6. Governing Law & Jurisdiction" }),
						/* @__PURE__ */ jsx("p", { children: "These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with sales or services shall be subject to the exclusive jurisdiction of the competent courts in Delhi." }),
						/* @__PURE__ */ jsx("h2", { children: "7. Contact Information" }),
						/* @__PURE__ */ jsxs("address", {
							className: "legal-page__contact-box",
							children: [
								/* @__PURE__ */ jsx("strong", { children: "JSR EV Spare Parts" }),
								/* @__PURE__ */ jsx("br", {}),
								"Founder: Deepak Choudhary",
								/* @__PURE__ */ jsx("br", {}),
								"Sector 18, Rohini, Delhi – 110089 (Near Data Ram Apartment)",
								/* @__PURE__ */ jsx("br", {}),
								"Phone: ",
								/* @__PURE__ */ jsx("a", {
									href: "tel:+919990120067",
									children: "+91 9990120067"
								}),
								" ",
								/* @__PURE__ */ jsx("br", {}),
								"Email: ",
								/* @__PURE__ */ jsx("a", {
									href: "mailto:admin@jsrevtech.in",
									children: "admin@jsrevtech.in"
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "legal-page__actions",
							children: /* @__PURE__ */ jsx("a", {
								href: "/",
								className: "legal-page__btn",
								children: "Back to Home"
							})
						})
					]
				})
			]
		})
	});
}
// src/RefundPolicy.jsx
function RefundPolicy() {
	return /* @__PURE__ */ jsx("main", {
		className: "legal-page",
		"aria-labelledby": "refund-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container legal-page__container",
			children: [
				/* @__PURE__ */ jsxs("nav", {
					className: "legal-page__breadcrumb",
					"aria-label": "Breadcrumb",
					children: [
						/* @__PURE__ */ jsx("a", {
							href: "/",
							className: "legal-page__breadcrumb-link",
							children: "Home"
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: "legal-page__breadcrumb-sep",
							children: "/"
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-current": "page",
							children: "Refund & Return Policy"
						})
					]
				}),
				/* @__PURE__ */ jsxs("header", {
					className: "legal-page__header",
					children: [/* @__PURE__ */ jsx("h1", {
						id: "refund-heading",
						className: "legal-page__title",
						children: "Refund & Return Policy"
					}), /* @__PURE__ */ jsx("p", {
						className: "legal-page__updated",
						children: "Last Updated: November 2026"
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "legal-page__content",
					children: [
						/* @__PURE__ */ jsxs("p", { children: [
							"At ",
							/* @__PURE__ */ jsx("strong", { children: "JSR EV Spare Parts" }),
							" (Sector 18, Rohini, Delhi), we value our customers and strive to supply genuine, tested electric rickshaw and scooter components. Because electrical and automotive spares require specific installation safeguards, please review our refund, return, and exchange terms below."
						] }),
						/* @__PURE__ */ jsx("h2", { children: "1. Return & Exchange Eligibility Period" }),
						/* @__PURE__ */ jsx("p", { children: "Non-electrical mechanical spare parts (such as bearings, metal brackets, suspensions, standard hardware) purchased in-store may be returned or exchanged within:" }),
						/* @__PURE__ */ jsx("div", {
							className: "legal-page__notice",
							role: "note",
							children: /* @__PURE__ */ jsxs("p", { children: [
								/* @__PURE__ */ jsx("strong", { children: "Return Window:" }),
								" ",
								/* @__PURE__ */ jsx("em", { children: "[TODO: Owner to confirm return timeframe — standard recommendation: 3 to 7 business days from invoice date]" })
							] })
						}),
						/* @__PURE__ */ jsx("p", { children: "To qualify for a return or exchange:" }),
						/* @__PURE__ */ jsxs("ul", { children: [
							/* @__PURE__ */ jsx("li", { children: "The item must be in its original, undamaged packaging." }),
							/* @__PURE__ */ jsx("li", { children: "The item must show no signs of attempted installation, thread damage, scratches, oil, or tool marks." }),
							/* @__PURE__ */ jsx("li", { children: "You must present the original cash memo / bill of purchase from JSR EV Spare Parts." })
						] }),
						/* @__PURE__ */ jsx("h2", { children: "2. Electrical Components Policy" }),
						/* @__PURE__ */ jsx("p", { children: "Due to the sensitive nature of electric vehicle electronics:" }),
						/* @__PURE__ */ jsxs("ul", { children: [
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Testing at Counter:" }), " Electrical parts (including motors, controllers, digital meters, throttle sets, converters, and relays) are tested or verified at our counter at the time of purchase where feasible."] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Fitted/Burnt Items Non-Returnable:" }), " Any electrical component that has been connected to vehicle wiring, subjected to short circuits, over-voltage, improper polarity, or water ingress cannot be returned or refunded."] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Manufacturer Warranty:" }), " If an item carries an official manufacturer warranty, we will gladly assist in routing the unit through the manufacturer’s warranty procedure."] })
						] }),
						/* @__PURE__ */ jsx("h2", { children: "3. Non-Returnable Items" }),
						/* @__PURE__ */ jsxs("ul", { children: [
							/* @__PURE__ */ jsx("li", { children: "Consumables and wear-and-tear parts (tyres, brake pads/shoes, grease, rubber boots, wiring harnesses once cut/soldered)." }),
							/* @__PURE__ */ jsx("li", { children: "Items sold under clearance, wholesale discount, or customized/ordered specifically on non-standard request." }),
							/* @__PURE__ */ jsx("li", { children: "Parts missing original labels, seals, or batch numbers." })
						] }),
						/* @__PURE__ */ jsx("h2", { children: "4. Refund Method & Processing" }),
						/* @__PURE__ */ jsxs("ul", { children: [
							/* @__PURE__ */ jsxs("li", { children: [
								"Approved returns are typically processed as an ",
								/* @__PURE__ */ jsx("strong", { children: "Exchange" }),
								" for the correct part or store credit."
							] }),
							/* @__PURE__ */ jsxs("li", { children: [
								"Where a monetary refund is authorized by management, it will be issued via the original payment mode (cash or UPI) within ",
								/* @__PURE__ */ jsx("em", { children: "[TODO: 1–3 business days]" }),
								"."
							] }),
							/* @__PURE__ */ jsx("li", { children: "Fitting and labour charges are non-refundable once the service work has been performed." })
						] }),
						/* @__PURE__ */ jsx("h2", { children: "5. How to Initiate a Return or Exchange" }),
						/* @__PURE__ */ jsx("p", { children: "Please bring the part along with your invoice directly to our shop counter:" }),
						/* @__PURE__ */ jsxs("address", {
							className: "legal-page__contact-box",
							children: [
								/* @__PURE__ */ jsx("strong", { children: "JSR EV Spare Parts" }),
								/* @__PURE__ */ jsx("br", {}),
								"Deepak Choudhary",
								/* @__PURE__ */ jsx("br", {}),
								"Sector 18, Rohini, Delhi – 110089 (Near Data Ram Apartment)",
								/* @__PURE__ */ jsx("br", {}),
								"Helpline: ",
								/* @__PURE__ */ jsx("a", {
									href: "tel:+919990120067",
									children: "+91 9990120067"
								}),
								" (8:00 AM – 8:00 PM, 7 Days)"
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "legal-page__actions",
							children: /* @__PURE__ */ jsx("a", {
								href: "/",
								className: "legal-page__btn",
								children: "Back to Home"
							})
						})
					]
				})
			]
		})
	});
}
// src/useScrollReveal.js
/**
* High-performance, zero-dependency IntersectionObserver hook for smooth scroll-reveal animations.
*
* - Automatically respects 'prefers-reduced-motion'
* - Animates each element only once (triggerOnce) for optimal performance
* - Fully safe for SSR / static prerendering
*/
function useScrollReveal() {
	useEffect(() => {
		if (typeof window === "undefined") return;
		document.documentElement.classList.add("js-ready");
		if (!("IntersectionObserver" in window)) {
			document.querySelectorAll(".reveal, .reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger").forEach((el) => el.classList.add("is-revealed"));
			return;
		}
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			document.querySelectorAll(".reveal, .reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger").forEach((el) => el.classList.add("is-revealed"));
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-revealed");
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: .12,
			rootMargin: "0px 0px -40px 0px"
		});
		document.querySelectorAll(".reveal, .reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger").forEach((el) => observer.observe(el));
		return () => {
			observer.disconnect();
		};
	}, []);
}
// src/App.jsx
/** Resolves current pathname cleanly. */
function getPath(url) {
	if (url) return url.replace(/\/$/, "") || "/";
	if (typeof window === "undefined") return "/";
	return window.location.pathname.replace(/\/$/, "") || "/";
}
function App({ url }) {
	const [currentPath, setCurrentPath] = useState(() => getPath(url));
	useScrollReveal();
	useEffect(() => {
		const onPop = () => setCurrentPath(getPath());
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, []);
	const isHome = currentPath === "/" || currentPath === "/index.html";
	const isPrivacy = currentPath === "/privacy" || currentPath === "/privacy.html";
	const isTerms = currentPath === "/terms" || currentPath === "/terms.html";
	const isRefund = currentPath === "/refund" || currentPath === "/refund.html";
	let mainContent;
	if (isHome) mainContent = /* @__PURE__ */ jsxs("main", {
		"aria-label": "Main content",
		children: [
			/* @__PURE__ */ jsx(Hero, {}),
			/* @__PURE__ */ jsx(Services, {}),
			/* @__PURE__ */ jsx(WhyChooseUs, {}),
			/* @__PURE__ */ jsx(StatsStrip, {}),
			/* @__PURE__ */ jsx(About, {}),
			/* @__PURE__ */ jsx(Reviews, {}),
			/* @__PURE__ */ jsx(FAQ, {}),
			/* @__PURE__ */ jsx(StoreLocation, {})
		]
	});
	else if (isPrivacy) mainContent = /* @__PURE__ */ jsx(PrivacyPolicy, {});
	else if (isTerms) mainContent = /* @__PURE__ */ jsx(Terms, {});
	else if (isRefund) mainContent = /* @__PURE__ */ jsx(RefundPolicy, {});
	else mainContent = /* @__PURE__ */ jsx(NotFound, {});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Navbar, {}),
		mainContent,
		/* @__PURE__ */ jsx(BackToTop, {}),
		/* @__PURE__ */ jsx(FloatingCTA, {}),
		/* @__PURE__ */ jsx(Footer, {})
	] });
}
// src/entry-server.jsx
function render(url = "/") {
	return renderToString(/* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(App, { url }) }));
}
export { render };
