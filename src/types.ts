export interface FAQItem {
	question: string;
	answer: string;
}

export interface FooterLink {
	description: string;
	icon: string;
	url: string;
}

export interface NavItem {
	title: string;
	url: string;
	selected: boolean;
}

export interface Project {
	title: string;
	image: string;
	url: string;
}
