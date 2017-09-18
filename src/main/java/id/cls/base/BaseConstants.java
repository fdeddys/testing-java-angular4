package id.cls.base;

import java.time.LocalDateTime;

/**
 * Created by dev on 13/07/2017.
 */
public class BaseConstants {
    public static final String ROLE_PARENT_ORGANIZATION = "10";
    public static final String ROLE_INTERNAL = "11";
    public static final String ROLE_CUSTOMER = "12";
    public static final String ROLE_VENDOR = "13";
    public static final String ROLE_BRANCH = "50";

    public static final String ROLE_CUSTOMER_PERSONAL = "110";
    public static final String ROLE_CUSTOMER_ORGANIZATION = "111";

    public static final String RELT_CUSTOMER = "10";

    public static final int STATUS_NOT_DEFINED = 0;
    public static final int STATUS_DRAFT = 10;
    public static final int STATUS_OPEN = 11;
    public static final int STATUS_CANCEL = 13;
    public static final int STATUS_COMPLETED = 17;
    public static final int STATUS_ACTIVE = 31;
    public static final int STATUS_SUSPEND = 32;
    public static final int STATUS_HOLD = 33;

    public static final String PRODUCT_TYPE_GOOD = "10";
    public static final String PRODUCT_TYPE_SERVICE = "11";
    public static final String PRODUCT_TYPE_FINANCE = "20";
    public static final String PRODUCT_TYPE_MOTOR = "21";

    public static LocalDateTime endDate() {
        return LocalDateTime.of(9999, 12, 31, 23, 59, 59);
    }
}
