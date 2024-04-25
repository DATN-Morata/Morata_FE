const HelpCenterIcon = ({ className, color = '#16bcdc' }: { className?: string; color?: string }) => {
    return (
        <svg
            className={className}
            id='Layer_1'
            enable-background='new 0 0 64 64'
            viewBox='0 0 64 64'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g fill='rgb(0,0,0)'>
                <path
                    fill={color}
                    d='m58.13 5.4h-26.55c-3.23 0-5.87 2.66-5.87 5.92v7.87h-18.75c-3.84 0-6.96 3.15-6.96 7.02v18.97c0 3.58 2.66 6.54 6.09 6.97l.27 5.19c.02.56.38 1.03.91 1.2.14.05.28.07.41.07.35 0 .68-.14.93-.39l7.65-6.01h23.11c3.84 0 6.96-3.15 6.96-7.03v-12.4h4.11l6.22 4.89c.24.23.55.36.88.36.13 0 .27-.02.41-.07.5-.17.84-.61.86-1.13l.21-4.12c2.82-.43 4.99-2.89 4.99-5.86v-15.53c-.01-3.27-2.64-5.92-5.88-5.92zm-18.75 44.86h-23.45c-.22 0-.43.07-.6.21l-7.09 5.57-.25-4.86c-.03-.52-.51-.92-1.03-.92-2.77 0-5.02-2.28-5.02-5.09v-18.96c0-2.8 2.25-5.08 5.02-5.08h32.42c2.77 0 5.02 2.28 5.02 5.08v5.59.01s0 .01 0 .01v13.35c-.01 2.81-2.26 5.09-5.02 5.09zm22.68-23.4c0 2.2-1.76 3.99-3.98 3.99-.52 0-.94.4-.97.92l-.19 3.65-5.55-4.36c-.17-.13-.38-.21-.6-.21h-4.45v-4.64c0-3.87-3.12-7.02-6.96-7.02h-11.71v-7.87c0-2.2 1.76-3.99 3.93-3.99h26.55c2.17 0 3.93 1.79 3.93 3.99z'
                ></path>
                <path
                    fill={color}
                    d='m33.89 28.58h-21.45c-.54 0-.97.43-.97.97s.43.97.97.97h21.46c.54 0 .97-.43.97-.97-.01-.54-.44-.97-.98-.97z'
                ></path>
                <path
                    fill={color}
                    d='m33.89 40.87h-21.45c-.54 0-.97.43-.97.97s.43.97.97.97h21.46c.54 0 .97-.43.97-.97s-.44-.97-.98-.97z'
                ></path>
                <path
                    fill={color}
                    d='m33.89 34.72h-21.45c-.54 0-.97.43-.97.97s.43.97.97.97h21.46c.54 0 .97-.43.97-.97-.01-.53-.44-.97-.98-.97z'
                ></path>
            </g>
        </svg>
    );
};

export default HelpCenterIcon;
