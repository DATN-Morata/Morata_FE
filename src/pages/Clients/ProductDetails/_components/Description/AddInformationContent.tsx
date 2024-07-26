import { IAttributesProduct } from '~/types/Product';

const AddInformationContent = ({ attributes }: { attributes: IAttributesProduct }) => {
    return (
        <>
            <div className='product-desc-content min-h-[250px]'>
                {attributes && (
                    <table className=' w-[80%] '>
                        <tbody>
                            {attributes.map((item, index) => (
                                <tr key={index} className='odd:bg-gray-100   even:bg-white'>
                                    <td className='label  pl-5 font-bold'>
                                        <h3 className='py-2'>{item.key.toUpperCase()}</h3>
                                    </td>
                                    <td className='value'>
                                        <p className='text-[#777777]'>{item.value}</p>
                                    </td>
                                </tr>
                            ))}
                            {/* <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Product Type</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>New, Renewed, Refurbished, Used</p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Storage</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>64GB, 512GB, 2TB</p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Brand</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>Apple</p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Display</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>10.9‑inch Liquid Retina display with True Tone</p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Capacity</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>128GB, 256GB, 512GB</p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Chip (CPU)</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>Apple M1 with 8-core CPU, 8-core GPU</p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Camera and Video</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>12MP – 4K Video</p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Front Camera</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>
                                    12MP Ultra Wide front camera with Center Stage and Smart HDR 3
                                </p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Battery Life</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>
                                    Up to 10 hours on Wi‑Fi, Up to 9 hours using cellular data network
                                </p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>In the Box</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>
                                    iPad Air, USB-C Charge Cable (1 meter), 20W USB-CPower Adapter
                                </p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Height</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>9.74 inches (247.6 mm)</p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Width</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>7.02 inches (178.5 mm)</p>
                            </td>
                        </tr>
                        <tr className='odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Weight</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>
                                    1.0 pound (458 grams) Wi-Fi model; 1.02 pounds (462 grams) Wi-Fi
                                </p>
                            </td>
                        </tr>
                        <tr className=' odd:bg-gray-100 even:bg-white'>
                            <td className='label  pl-5 font-bold'>
                                <h3 className='py-2'>Mobile Network</h3>
                            </td>
                            <td className='value'>
                                <p className='text-[#777777]'>5G</p>
                            </td>
                        </tr> */}
                        </tbody>
                    </table>
                )}
                {!attributes.length && (
                    <div className='flex min-h-[250px] items-center justify-center'>
                        <h3>This product doesn&apos;t have any details!</h3>
                    </div>
                )}
            </div>
        </>
    );
};

export default AddInformationContent;
