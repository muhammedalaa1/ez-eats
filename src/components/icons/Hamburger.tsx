import type { SVGProps } from "react";

export function Hamburger(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3rem"
            height="3rem"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="none"
                stroke="#f13c4f"
                strokeLinecap="round"
                strokeWidth={1.5}
                d="M20 7H4m16 5H4m16 5H4"
            ></path>
        </svg>
    );
}
