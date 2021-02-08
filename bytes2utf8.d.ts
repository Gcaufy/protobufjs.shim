/** Conversion options as used by {@link Type#toObject} and {@link Message.toObject}. */
export interface IConversionShimOptions {

    /**
     * Long conversion type.
     * Valid values are `String` and `Number` (the global types).
     * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
     */
    longs?: Function;

    /**
     * Enum value conversion type.
     * Only valid value is `String` (the global type).
     * Defaults to copy the present value, which is the numeric id.
     */
    enums?: Function;

    /**
     * Bytes value conversion type.
     * Valid values are `Array` and (a base64 encoded) `String` (the global types).
     * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
     */
    bytes?: Function | 'utf8';

    /** Also sets default values on the resulting object */
    defaults?: boolean;

    /** Sets empty arrays for missing repeated fields even if `defaults=false` */
    arrays?: boolean;

    /** Sets empty objects for missing map fields even if `defaults=false` */
    objects?: boolean;

    /** Includes virtual oneof properties set to the present field's name, if any */
    oneofs?: boolean;

    /** Performs additional JSON compatibility conversions, i.e. NaN and Infinity to strings */
    json?: boolean;
}

