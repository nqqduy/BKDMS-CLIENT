function Button({ type, classname, handleFunction, text, icon, disable }) {
    return (
        <button
            type={type}
            className={classname}
            onClick={handleFunction}
            disabled={disable}
        >
            {icon} {text}
        </button>
    );
}

export default Button;
