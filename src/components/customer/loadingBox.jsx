export default function LoadingBox() {
    return (
        <div className="flex-row">
            <p className="animate-bounce ml-6 xss:ml-8 xs:ml-10 sm:ml-16 mt-2 xss:mt-4 xs:mt-8 sm:mt-10 text-sm xss:text-base xs:text-xl sm:text-2xl text-textLight dark:text-warn">
                Loading 
                {/* <svg className="animate-bounce inline-block bg-textLight rounded-full w-2 h-2"></svg><span> </span>
                <svg className="animate-bounce inline-block bg-textLight rounded-full w-2 h-2"></svg><span> </span>
                <svg className="animate-bounce inline-block bg-textLight rounded-full w-2 h-2"></svg><span> </span> */}
                
                <svg className="animate-spin inline-block bg-textLight h-1.5 xss:h-2 xs:h-2 sm:h-3 w-1.5 xss:w-2 xs:w-2 sm:w-3 ml-1 xs:ml-2 sm:ml-3 mr-1 xs:mr-2 sm:mr-3 dark:bg-warn"></svg>
                <svg className="animate-spin inline-block bg-textLight h-1.5 xss:h-2 xs:h-2 sm:h-3 w-1.5 xss:w-2 xs:w-2 sm:w-3 mr-1 xs:mr-2 sm:mr-3 dark:bg-warn"></svg>
                <svg className="animate-spin inline-block bg-textLight h-1.5 xss:h-2 xs:h-2 sm:h-3 w-1.5 xss:w-2 xs:w-2 sm:w-3 mr-1 xs:mr-2 sm:mr-3 dark:bg-warn"></svg>

                {/* <div className="animate-spin inline-block rounded-full h-4 w-4 border-b-2 border-textLight mr-1 xs:mr-2 sm:mr-3"></div>
                <div className="animate-spin inline-block rounded-full h-4 w-4 border-b-2 border-textLight mr-1 xs:mr-2 sm:mr-3"></div>
                <div className="animate-spin inline-block rounded-full h-4 w-4 border-b-2 border-textLight mr-1 xs:mr-2 sm:mr-3"></div> */}
                
                {/* <div className="animate-spin inline-block rounded-full h-4 w-4 border-b-2 border-t-2 border-textLight mr-1 xs:mr-2 sm:mr-3"></div>
                <div className="animate-spin inline-block rounded-full h-4 w-4 border-b-2 border-t-2 border-textLight mr-1 xs:mr-2 sm:mr-3"></div>
                <div className="animate-spin inline-block rounded-full h-4 w-4 border-b-2 border-t-2 border-textLight mr-1 xs:mr-2 sm:mr-3"></div> */}
            </p>
        </div>
    )
}