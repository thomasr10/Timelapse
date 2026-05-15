interface ButtonProps {
    type: "submit" | "reset" | "button",
    disabled: boolean,
    children: string,
    className: string
}

export default function Button(props: ButtonProps) {

    return (
        <button className={props.className} type={props.type} disabled={props.disabled}>
            { props.children }
        </button>
    )
}