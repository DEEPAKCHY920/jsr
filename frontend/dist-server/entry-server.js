import { StrictMode, useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
// src/Navbar.jsx
var DESKTOP_QUERY = "(min-width: 900px)";
var navLinks = [
	{
		id: "home",
		href: "#home",
		label: "Home",
		active: true,
		icon: /* @__PURE__ */ jsx("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" })
		})
	},
	{
		id: "about",
		href: "#about",
		label: "About Us",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" })
		})
	},
	{
		id: "parts-enquiry",
		href: "#contact",
		label: "Parts Enquiry",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ jsx("path", { d: "M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" })
		})
	},
	{
		id: "contact",
		href: "#contact",
		label: "Contact",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "16",
			height: "16",
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
	const mobileContainerRef = useRef(null);
	const hamburgerRef = useRef(null);
	const logoRef = useRef(null);
	useEffect(() => {
		const handlePointerDown = (event) => {
			if (mobileOpen && mobileContainerRef.current && !mobileContainerRef.current.contains(event.target) && !hamburgerRef.current?.contains(event.target)) setMobileOpen(false);
		};
		const handleKeyDown = (event) => {
			if (event.key !== "Escape") return;
			if (mobileOpen) {
				setMobileOpen(false);
				hamburgerRef.current?.focus();
			}
		};
		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [mobileOpen]);
	useEffect(() => {
		const mediaQuery = window.matchMedia(DESKTOP_QUERY);
		const resetForBreakpoint = (event) => {
			const activeElement = document.activeElement;
			if (event.matches && mobileContainerRef.current?.contains(activeElement)) logoRef.current?.focus();
			setMobileOpen(false);
		};
		mediaQuery.addEventListener("change", resetForBreakpoint);
		return () => mediaQuery.removeEventListener("change", resetForBreakpoint);
	}, []);
	const handleMobileLink = () => setMobileOpen(false);
	return /* @__PURE__ */ jsx("header", {
		className: "site-header",
		role: "banner",
		children: /* @__PURE__ */ jsxs("nav", {
			className: "navbar",
			"aria-label": "Main navigation",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "container navbar__inner",
				children: [
					/* @__PURE__ */ jsx("a", {
						ref: logoRef,
						href: "#home",
						className: "logo",
						"aria-label": "JSR EV SPARE PARTS – home",
						children: /* @__PURE__ */ jsx("img", {
							src: "/jsr-logo.png",
							alt: "JSR EV SPARE PARTS",
							className: "logo__img",
							width: "180",
							height: "60"
						})
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "nav-links",
						role: "list",
						children: navLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
							href: link.href,
							className: `nav-link${link.active ? " nav-link--active" : ""}`,
							"aria-current": link.active ? "page" : void 0,
							children: [link.icon, link.label]
						}) }, link.id))
					}),
					/* @__PURE__ */ jsxs("a", {
						href: "#contact",
						className: "btn-enquire",
						"aria-label": "Contact JSR EV SPARE PARTS",
						children: [
							/* @__PURE__ */ jsx("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": "true",
								focusable: "false",
								children: /* @__PURE__ */ jsx("path", { d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" })
							}),
							"Enquire Now",
							/* @__PURE__ */ jsx("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.5",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								"aria-hidden": "true",
								focusable: "false",
								children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
							})
						]
					}),
					/* @__PURE__ */ jsxs("button", {
						ref: hamburgerRef,
						type: "button",
						className: `hamburger${mobileOpen ? " hamburger--open" : ""}`,
						id: "hamburger-btn",
						"aria-label": mobileOpen ? "Close navigation menu" : "Open navigation menu",
						"aria-expanded": mobileOpen,
						"aria-controls": "mobile-menu",
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
			}), /* @__PURE__ */ jsxs("div", {
				ref: mobileContainerRef,
				className: `mobile-menu${mobileOpen ? " mobile-menu--open" : ""}`,
				id: "mobile-menu",
				"aria-label": "Mobile navigation",
				hidden: !mobileOpen,
				children: [/* @__PURE__ */ jsx("ul", {
					className: "mobile-nav",
					role: "list",
					children: navLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
						href: link.href,
						className: `mobile-nav__link${link.active ? " mobile-nav__link--active" : ""}`,
						"aria-current": link.active ? "page" : void 0,
						onClick: handleMobileLink,
						children: [/* @__PURE__ */ jsx("span", {
							className: "mobile-nav__icon",
							children: link.icon
						}), link.label]
					}) }, link.id))
				}), /* @__PURE__ */ jsx("div", {
					className: "mobile-menu__cta",
					children: /* @__PURE__ */ jsxs("a", {
						href: "#contact",
						className: "btn-enquire btn-enquire--full",
						"aria-label": "Contact JSR EV SPARE PARTS",
						onClick: handleMobileLink,
						children: [/* @__PURE__ */ jsx("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": "true",
							focusable: "false",
							children: /* @__PURE__ */ jsx("path", { d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" })
						}), "Enquire Now"]
					})
				})]
			})]
		})
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
						children: "Genuine spare parts, repair and fitting services for e-rickshaws and electric scooters."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hero__actions",
						children: [/* @__PURE__ */ jsxs("a", {
							href: "https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20spare%20parts%20or%20services.",
							className: "hero__btn hero__btn--whatsapp",
							"aria-label": "Send JSR EV SPARE PARTS a WhatsApp enquiry",
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
							"aria-label": "Call JSR EV SPARE PARTS",
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
			}), /* @__PURE__ */ jsx("div", {
				className: "hero__image-wrap",
				children: /* @__PURE__ */ jsx("img", {
					src: "/hero-ev-banner.png",
					alt: "Blue e-rickshaw with motor, controller, brake shoes and tyre spare parts",
					className: "hero__banner-img",
					width: "552",
					height: "402",
					loading: "eager",
					decoding: "async",
					fetchPriority: "high"
				})
			})]
		})
	});
}
// src/About.jsx
var shopDetails = [
	{
		id: "established",
		label: "Established",
		value: "2024"
	},
	{
		id: "location",
		label: "Location",
		value: "Sector 18, Rohini, Delhi"
	},
	{
		id: "vehicles",
		label: "Spare Parts For",
		value: "E-Rickshaws & Electric Scooters"
	},
	{
		id: "services",
		label: "Services",
		value: "Spare Parts Sales, Repair & Fitting"
	},
	{
		id: "customers",
		label: "We Serve",
		value: "Retail Customers, Mechanics & Dealers"
	}
];
function About() {
	return /* @__PURE__ */ jsx("section", {
		className: "about",
		id: "about",
		"aria-labelledby": "about-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container about__inner",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "about__media",
				children: [/* @__PURE__ */ jsx("img", {
					src: "/shop.jpg",
					alt: "JSR EV Spares Parts shop front in Sector 18, Rohini, Delhi",
					className: "about__photo",
					loading: "lazy",
					decoding: "async"
				}), /* @__PURE__ */ jsx("span", {
					className: "about__photo-caption",
					children: "JSR EV Spares Parts — Our Shop"
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "about__content",
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
						children: "About JSR EV SPARE PARTS"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "about__copy",
						children: "Since 2024, we have served retail customers, mechanics and dealers with spare parts, repair and fitting services for e-rickshaws and electric scooters."
					}),
					/* @__PURE__ */ jsx("table", {
						className: "about__details",
						children: /* @__PURE__ */ jsx("tbody", { children: shopDetails.map((detail) => /* @__PURE__ */ jsxs("tr", {
							className: "about__detail-row",
							children: [/* @__PURE__ */ jsx("th", {
								scope: "row",
								children: detail.label
							}), /* @__PURE__ */ jsx("td", { children: detail.value })]
						}, detail.id)) })
					}),
					/* @__PURE__ */ jsxs("a", {
						className: "about__button",
						href: "#contact",
						children: ["Contact Our Shop", /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							"aria-hidden": "true",
							focusable: "false",
							children: /* @__PURE__ */ jsx("path", {
								d: "M5 12h14M13 6l6 6-6 6",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})]
					})
				]
			})]
		})
	});
}
// assets/images/founder-deepak-choudhary.webp
var founder_deepak_choudhary_default = "/assets/founder-deepak-choudhary-Db5M9Y9t.webp";
// src/Founder.jsx
function Founder() {
	return /* @__PURE__ */ jsxs("section", {
		className: "founder",
		id: "founder",
		"aria-labelledby": "founder-heading",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "founder__decoration founder__decoration--top",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "founder__decoration founder__decoration--bottom",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container founder__inner",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "founder__portrait-wrap",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "founder__corner founder__corner--top",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "founder__corner founder__corner--bottom",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ jsx("img", {
							className: "founder__portrait",
							src: founder_deepak_choudhary_default,
							alt: "Deepak Choudhary, founder of JSR EV SPARE PARTS",
							width: "340",
							height: "340",
							loading: "lazy",
							decoding: "async"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "founder__content",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "founder__label-row",
							children: [/* @__PURE__ */ jsx("p", {
								className: "founder__eyebrow",
								children: "MEET OUR FOUNDER"
							}), /* @__PURE__ */ jsx("span", {
								className: "founder__label-line",
								"aria-hidden": "true"
							})]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "founder__heading",
							id: "founder-heading",
							children: "Deepak Choudhary"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "founder__designation",
							children: "Founder · JSR EV SPARE PARTS"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "founder__copy",
							children: [/* @__PURE__ */ jsx("p", { children: "Deepak Choudhary is the founder of JSR EV SPARE PARTS, established in 2024 in Sector 18, Rohini, Delhi." }), /* @__PURE__ */ jsx("p", { children: "The shop serves retail customers, mechanics and dealers with spare parts for e-rickshaws and electric scooters, along with repair and fitting services." })]
						}),
						/* @__PURE__ */ jsxs("ul", {
							className: "founder__chips",
							role: "list",
							children: [/* @__PURE__ */ jsxs("li", {
								className: "founder__chip",
								children: [/* @__PURE__ */ jsxs("svg", {
									viewBox: "0 0 24 24",
									fill: "none",
									"aria-hidden": "true",
									focusable: "false",
									children: [/* @__PURE__ */ jsx("rect", {
										x: "4",
										y: "5",
										width: "16",
										height: "15",
										rx: "2",
										stroke: "currentColor",
										strokeWidth: "2"
									}), /* @__PURE__ */ jsx("path", {
										d: "M8 3v4M16 3v4M4 10h16M8 14h2M14 14h2",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinecap: "round"
									})]
								}), /* @__PURE__ */ jsx("span", { children: "Established 2024" })]
							}), /* @__PURE__ */ jsxs("li", {
								className: "founder__chip",
								children: [/* @__PURE__ */ jsxs("svg", {
									viewBox: "0 0 24 24",
									fill: "none",
									"aria-hidden": "true",
									focusable: "false",
									children: [/* @__PURE__ */ jsx("path", {
										d: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z",
										stroke: "currentColor",
										strokeWidth: "2"
									}), /* @__PURE__ */ jsx("circle", {
										cx: "12",
										cy: "10",
										r: "2.5",
										stroke: "currentColor",
										strokeWidth: "2"
									})]
								}), /* @__PURE__ */ jsx("span", { children: "Rohini, Delhi" })]
							})]
						})
					]
				})]
			})
		]
	});
}
// src/Services.jsx
function Services() {
	return /* @__PURE__ */ jsx("section", {
		className: "services",
		id: "services",
		"aria-labelledby": "services-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container services__inner",
			children: [
				/* @__PURE__ */ jsxs("header", {
					className: "services__header",
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
							children: "Spare parts, repair and fitting for your electric vehicle."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "services__grid",
					children: [
						/* @__PURE__ */ jsxs("article", {
							className: "services__card",
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
								children: [/* @__PURE__ */ jsx("h3", {
									className: "services__card-heading",
									children: "Spare Parts Sales"
								}), /* @__PURE__ */ jsx("p", {
									className: "services__card-copy",
									children: "Spare parts for e-rickshaws and electric scooters."
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("article", {
							className: "services__card",
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
								children: [/* @__PURE__ */ jsx("h3", {
									className: "services__card-heading",
									children: "Repair Services"
								}), /* @__PURE__ */ jsx("p", {
									className: "services__card-copy",
									children: "Visit our shop to discuss your vehicle’s repair requirements."
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("article", {
							className: "services__card",
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
								children: [/* @__PURE__ */ jsx("h3", {
									className: "services__card-heading",
									children: "Parts Fitting"
								}), /* @__PURE__ */ jsx("p", {
									className: "services__card-copy",
									children: "Get fitting services for your e-rickshaw and electric scooter parts."
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "services__actions",
					children: /* @__PURE__ */ jsxs("a", {
						className: "services__button",
						href: "#contact",
						children: ["Contact Us for Service", /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							"aria-hidden": "true",
							focusable: "false",
							children: /* @__PURE__ */ jsx("path", {
								d: "M5 12h14M13 6l6 6-6 6",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})]
					})
				})
			]
		})
	});
}
// src/Contact.jsx
function Contact() {
	return /* @__PURE__ */ jsx("section", {
		className: "contact",
		id: "contact",
		"aria-labelledby": "contact-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container contact__inner",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "contact__header",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "contact__heading",
					id: "contact-heading",
					children: "Visit or Contact Our Shop"
				}), /* @__PURE__ */ jsx("p", {
					className: "contact__subtitle",
					children: "Contact us for spare parts, repair and fitting enquiries."
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "contact__layout",
				children: [/* @__PURE__ */ jsx("div", {
					className: "contact__details",
					children: /* @__PURE__ */ jsxs("div", {
						className: "contact__shop-card",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "contact__shop-name",
								children: "JSR EV SPARE PARTS"
							}),
							/* @__PURE__ */ jsx("address", {
								className: "contact__address",
								children: /* @__PURE__ */ jsxs("div", {
									className: "contact__detail",
									children: [/* @__PURE__ */ jsx("span", {
										className: "contact__icon",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsxs("svg", {
											viewBox: "0 0 24 24",
											fill: "none",
											focusable: "false",
											children: [/* @__PURE__ */ jsx("path", {
												d: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z",
												stroke: "currentColor",
												strokeWidth: "2"
											}), /* @__PURE__ */ jsx("circle", {
												cx: "12",
												cy: "10",
												r: "2.5",
												stroke: "currentColor",
												strokeWidth: "2"
											})]
										})
									}), /* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "contact__detail-label",
											children: "Address"
										}),
										/* @__PURE__ */ jsx("p", { children: "Sector 18, Rohini, Delhi – 110089" }),
										/* @__PURE__ */ jsx("p", {
											className: "contact__muted",
											children: "Near Data Ram Apartment"
										})
									] })]
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "contact__detail",
								children: [/* @__PURE__ */ jsx("span", {
									className: "contact__icon",
									"aria-hidden": "true",
									children: /* @__PURE__ */ jsx("svg", {
										viewBox: "0 0 24 24",
										fill: "none",
										focusable: "false",
										children: /* @__PURE__ */ jsx("path", {
											d: "M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 3c-4-1.5-7.5-5-9-9l3-2-2-4Z",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "contact__detail-label",
									children: "Phone & WhatsApp"
								}), /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", {
									href: "tel:+919990120067",
									children: "+91 9990120067"
								}) })] })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "contact__detail",
								children: [/* @__PURE__ */ jsx("span", {
									className: "contact__icon",
									"aria-hidden": "true",
									children: /* @__PURE__ */ jsxs("svg", {
										viewBox: "0 0 24 24",
										fill: "none",
										focusable: "false",
										children: [/* @__PURE__ */ jsx("circle", {
											cx: "12",
											cy: "12",
											r: "9",
											stroke: "currentColor",
											strokeWidth: "2"
										}), /* @__PURE__ */ jsx("path", {
											d: "M12 7v5l3.5 2",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})]
									})
								}), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("span", {
										className: "contact__detail-label",
										children: "Opening Hours"
									}),
									/* @__PURE__ */ jsx("p", { children: "8:00 AM – 8:00 PM" }),
									/* @__PURE__ */ jsx("p", {
										className: "contact__muted",
										children: "Open every day"
									})
								] })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "contact__actions",
								children: [/* @__PURE__ */ jsx("a", {
									className: "contact__button contact__button--primary",
									href: "tel:+919990120067",
									children: "Call Now"
								}), /* @__PURE__ */ jsx("a", {
									className: "contact__button contact__button--secondary",
									href: "https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20spare%20parts%20or%20services.",
									target: "_blank",
									rel: "noopener noreferrer",
									children: "WhatsApp"
								})]
							})
						]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "contact__map-card",
					children: [/* @__PURE__ */ jsx("iframe", {
						className: "contact__map",
						src: "https://maps.google.com/maps?q=Sector%2018%20Rohini%20Delhi&output=embed",
						title: "Approximate area map of Sector 18, Rohini, Delhi",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					}), /* @__PURE__ */ jsxs("div", {
						className: "contact__map-info",
						children: [/* @__PURE__ */ jsx("p", { children: "Area map only. Please call us for the exact shop location." }), /* @__PURE__ */ jsx("a", {
							className: "contact__maps-link",
							href: "https://www.google.com/maps/search/?api=1&query=Sector%2018%20Rohini%20Delhi",
							target: "_blank",
							rel: "noopener noreferrer",
							children: "View Area on Maps"
						})]
					})]
				})]
			})]
		})
	});
}
// src/Footer.jsx
var quickLinks = [
	{
		id: "home",
		href: "#home",
		label: "Home"
	},
	{
		id: "about",
		href: "#about",
		label: "About Our Shop"
	},
	{
		id: "services",
		href: "#services",
		label: "Our Services"
	},
	{
		id: "shop",
		href: "#about",
		label: "Shop / Products"
	},
	{
		id: "contact",
		href: "#contact",
		label: "Contact"
	}
];
var serviceHighlights = [
	{
		id: "genuine",
		label: "Genuine Parts",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#65C91A",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }), /* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "3"
			})]
		})
	},
	{
		id: "repair",
		label: "Repair & Fitting",
		icon: /* @__PURE__ */ jsx("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#65C91A",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
		})
	},
	{
		id: "fast",
		label: "Fast Service",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#65C91A",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("path", { d: "M10 17h4V5H2v12h3" }),
				/* @__PURE__ */ jsx("path", { d: "M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "7.5",
					cy: "17.5",
					r: "2.5"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "17.5",
					cy: "17.5",
					r: "2.5"
				})
			]
		})
	},
	{
		id: "trusted",
		label: "Trusted Shop",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "#65C91A",
			strokeWidth: "2.2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }), /* @__PURE__ */ jsx("path", { d: "M9 12l2 2 4-4" })]
		})
	}
];
var socialLinks = [
	{
		id: "instagram",
		label: "Instagram",
		href: "https://instagram.com",
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
		id: "youtube",
		label: "YouTube",
		href: "https://youtube.com",
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
			children: [/* @__PURE__ */ jsx("path", { d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" }), /* @__PURE__ */ jsx("path", {
				d: "m10 15 5-3-5-3z",
				fill: "currentColor"
			})]
		})
	},
	{
		id: "whatsapp",
		label: "WhatsApp",
		href: "https://wa.me/919990120067",
		icon: /* @__PURE__ */ jsxs("svg", {
			width: "20",
			height: "20",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }), /* @__PURE__ */ jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" })]
		})
	}
];
function FooterHeading({ title, isOpen, onToggle, isCollapsible = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `site-footer__heading-group ${isCollapsible ? "site-footer__heading-group--collapsible" : ""}`,
		onClick: isCollapsible ? onToggle : void 0,
		role: isCollapsible ? "button" : void 0,
		tabIndex: isCollapsible ? 0 : void 0,
		"aria-expanded": isCollapsible ? isOpen : void 0,
		onKeyDown: isCollapsible ? (e) => (e.key === "Enter" || e.key === " ") && onToggle() : void 0,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "site-footer__heading-title-wrap",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "site-footer__heading",
				children: title
			}), /* @__PURE__ */ jsx("span", {
				className: "site-footer__heading-bar",
				"aria-hidden": "true"
			})]
		}), isCollapsible && /* @__PURE__ */ jsx("svg", {
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
	});
}
function Footer() {
	const [quickLinksOpen, setQuickLinksOpen] = useState(false);
	const [contactOpen, setContactOpen] = useState(false);
	return /* @__PURE__ */ jsxs("footer", {
		className: "site-footer",
		role: "contentinfo",
		children: [/* @__PURE__ */ jsx("div", {
			className: "site-footer__bg-vehicle",
			"aria-hidden": "true"
		}), /* @__PURE__ */ jsxs("div", {
			className: "container site-footer__inner",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "site-footer__grid",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "site-footer__col site-footer__col--brand",
						children: [
							/* @__PURE__ */ jsxs("a", {
								className: "site-footer__logo",
								href: "#home",
								"aria-label": "JSR EV SPARE PARTS — back to home",
								children: [/* @__PURE__ */ jsxs("svg", {
									className: "site-footer__logo-car",
									viewBox: "0 0 150 40",
									fill: "none",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ jsx("path", {
										d: "M14 28l6-10h-5l9-12-3 8h5l-7 10h5z",
										fill: "#65C91A"
									}), /* @__PURE__ */ jsx("path", {
										d: "M26 22c10-12 32-17 56-17 26 0 46 5 56 17",
										stroke: "#65C91A",
										strokeWidth: "3.6",
										strokeLinecap: "round"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "site-footer__logo-text",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "site-footer__logo-main",
										children: [/* @__PURE__ */ jsx("span", {
											className: "site-footer__logo-brand",
											children: "JSR"
										}), /* @__PURE__ */ jsx("span", {
											className: "site-footer__logo-ev",
											children: "EV"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "site-footer__logo-sub",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "site-footer__logo-line",
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "site-footer__logo-tag",
												children: "SPARE PARTS"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "site-footer__logo-line",
												"aria-hidden": "true"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "site-footer__description",
								children: "Spare parts, repair and fitting services for e-rickshaws and electric scooters in Sector 18, Rohini, Delhi."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "site-footer__highlights",
								role: "list",
								children: serviceHighlights.map((item) => /* @__PURE__ */ jsxs("div", {
									className: "site-footer__highlight-item",
									role: "listitem",
									children: [/* @__PURE__ */ jsx("span", {
										className: "site-footer__highlight-icon",
										children: item.icon
									}), /* @__PURE__ */ jsx("span", {
										className: "site-footer__highlight-label",
										children: item.label
									})]
								}, item.id))
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "site-footer__divider-col",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "site-footer__col site-footer__col--links",
						children: [/* @__PURE__ */ jsx(FooterHeading, {
							title: "Quick Links",
							isOpen: quickLinksOpen,
							onToggle: () => setQuickLinksOpen(!quickLinksOpen),
							isCollapsible: true
						}), /* @__PURE__ */ jsx("div", {
							className: `site-footer__collapse-content ${quickLinksOpen ? "site-footer__collapse-content--open" : ""}`,
							children: /* @__PURE__ */ jsx("ul", {
								className: "site-footer__links",
								role: "list",
								children: quickLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
									href: link.href,
									className: "site-footer__link",
									children: [/* @__PURE__ */ jsx("svg", {
										className: "site-footer__link-arrow",
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.5",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" })
									}), /* @__PURE__ */ jsx("span", { children: link.label })]
								}) }, link.id))
							})
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "site-footer__divider-col",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "site-footer__col site-footer__col--contact",
						children: [/* @__PURE__ */ jsx(FooterHeading, {
							title: "Contact & Timings",
							isOpen: contactOpen,
							onToggle: () => setContactOpen(!contactOpen),
							isCollapsible: true
						}), /* @__PURE__ */ jsx("div", {
							className: `site-footer__collapse-content ${contactOpen ? "site-footer__collapse-content--open" : ""}`,
							children: /* @__PURE__ */ jsxs("address", {
								className: "site-footer__contact-list",
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
												fill: "currentColor",
												children: /* @__PURE__ */ jsx("path", { d: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" })
											})
										}), /* @__PURE__ */ jsx("a", {
											href: "tel:+919990120067",
											className: "site-footer__contact-link",
											children: "+91 9990120067"
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
											href: "https://wa.me/919990120067",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "site-footer__contact-link",
											children: "+91 9990120067"
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
											children: [
												"Sector 18, Rohini, Delhi – 110089",
												/* @__PURE__ */ jsx("br", {}),
												/* @__PURE__ */ jsx("span", {
													className: "site-footer__text-muted",
													children: "Near Data Ram Apartment"
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
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "site-footer__col site-footer__col--social",
						children: [/* @__PURE__ */ jsx(FooterHeading, { title: "Follow Us" }), /* @__PURE__ */ jsxs("div", {
							className: "site-footer__social-wrap",
							children: [/* @__PURE__ */ jsx("div", {
								className: "site-footer__social-row",
								children: socialLinks.map((item) => /* @__PURE__ */ jsx("a", {
									href: item.href,
									className: "site-footer__social-btn",
									"aria-label": `JSR EV on ${item.label}`,
									target: "_blank",
									rel: "noopener noreferrer",
									children: item.icon
								}, item.id))
							}), /* @__PURE__ */ jsx("img", {
								src: "/footer-mobile-rickshaw.png",
								alt: "JSR E-Rickshaw",
								className: "site-footer__social-rickshaw",
								loading: "lazy",
								width: "360",
								height: "285"
							})]
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "site-footer__bottom",
				children: [/* @__PURE__ */ jsx("p", {
					className: "site-footer__copyright",
					children: "© 2026 JSR EV SPARE PARTS. All rights reserved."
				}), /* @__PURE__ */ jsxs("div", {
					className: "site-footer__legal-links",
					children: [
						/* @__PURE__ */ jsx("a", {
							href: "#privacy",
							className: "site-footer__legal-link",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "site-footer__legal-divider",
							"aria-hidden": "true",
							children: "|"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "#terms",
							className: "site-footer__legal-link",
							children: "Terms & Conditions"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "site-footer__legal-divider",
							"aria-hidden": "true",
							children: "|"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "#refund",
							className: "site-footer__legal-link",
							children: "Refund Policy"
						})
					]
				})]
			})]
		})]
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
// src/App.jsx
/** Returns true when the current pathname is the root page. */
function isHomePath() {
	if (typeof window === "undefined") return true;
	const p = window.location.pathname;
	return p === "/" || p === "/index.html";
}
function App() {
	const [isHome, setIsHome] = useState(isHomePath);
	useEffect(() => {
		const onPop = () => setIsHome(isHomePath());
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, []);
	if (!isHome) return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Navbar, {}),
		/* @__PURE__ */ jsx(NotFound, {}),
		/* @__PURE__ */ jsx(Footer, {})
	] });
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Navbar, {}),
		/* @__PURE__ */ jsxs("main", {
			"aria-label": "Main content",
			children: [
				/* @__PURE__ */ jsx(Hero, {}),
				/* @__PURE__ */ jsx(About, {}),
				/* @__PURE__ */ jsx(Founder, {}),
				/* @__PURE__ */ jsx(Services, {}),
				/* @__PURE__ */ jsx(Contact, {})
			]
		}),
		/* @__PURE__ */ jsx(Footer, {})
	] });
}
// src/entry-server.jsx
function render() {
	return renderToString(/* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(App, {}) }));
}
export { render };
