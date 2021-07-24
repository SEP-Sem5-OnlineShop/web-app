import React, {forwardRef} from "react";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {wrap} from "popmotion";
import InputWithValidation from "../../../components/input-with-next-button";
import {useFormik} from "formik";
import * as Yup from "yup";
import {thunks} from "../../../store";
import {useDispatch} from "react-redux";

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 0 : -0,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 0 : -0,
            opacity: 0
        };
    }
};



const items = [
    {
        label: 'Telephone Number',
        id: 'telephone',
        name: 'telephone',
        type: 'text'
    },
    {
        label: 'Password',
        id: 'password',
        name: 'password',
        type: 'password'
    },
]


/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const LoginForm = (props, ref) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const item = wrap(0, items.length, page);


    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            telephone: '',
            password: '',
        },
        validationSchema: Yup.object({
            telephone: Yup.string()
                .required('Required')
                .matches('^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$',
                    'Telephone number did not matched with requirements!'),
            password: Yup.string()
                .required('Required')
        }),
        onSubmit: async values => {
            await dispatch(thunks.user.localSignIn(values.telephone, values.password))
        },
    });

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: {type: "spring", stiffness: 300, damping: 30},
                        opacity: {duration: 0.2}
                    }}
                    drag="x"
                    dragConstraints={{left: 0, right: 0}}
                    dragElastic={1}
                    onDragEnd={(e, {offset, velocity}) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                >
                    <InputWithValidation
                        label={items[item].label}
                        id={items[item].id}
                        name={items[item].name}
                        type={items[item].type}
                        formik={formik}
                    />
                </motion.div>
            </AnimatePresence>
            <button
                onClick={() => {
                    paginate(1)
                    console.log(page)
                }}
                className="h-8 w-8 mb-4 xxs:h-10 xxs:w-10 rounded-full p-0 shadow-md flex rounded-full justify-center items-center bg-white absolute left-10 z-10">
                <i className="text-secondary font-bold fas fa-chevron-left fa-xs"/>
            </button>
            <button
                onClick={() => paginate(-1)}
                className="h-8 w-8 mb-4 xxs:h-10 xxs:w-10 rounded-full p-0 shadow-md flex rounded-full justify-center items-center bg-white absolute right-10 z-10">
                <i className="text-secondary font-bold fas fa-chevron-right fa-xs"/>
            </button>
        </>
    );
};
export default forwardRef(LoginForm)