-- Home Table View for the search
CREATE VIEW search_home_table_view AS
SELECT
    areas.id AS area_id,
    areas.province_id,
    areas.district_id,
    areas.zone_id,
    areas.shared_id,
    areas.gozar_id,
    head_of_homes.id AS head_of_home_id,
    areas.area_information,
    areas.created_at,
    areas.remark,
    head_of_homes.name AS head_of_home_name,
    head_of_homes.serial_number,
    head_of_homes.father_name,
    head_of_homes.identity_card_number,
    ethnicities.name AS ethnicities_name,
    languages.name AS language_name,
    religions.religion_name AS religion_name,
    zones.name AS zone,
    provinces.name_dr AS province,
    districts.name_dr AS district,
    shareds.name AS shared_name,
    gozars.name AS gozar_name,
    home_family_members.head_of_family_id,
    home_family_members.family_member_serial_number,
    home_family_members.family_member_id,
    home_family_members.family_member_name,
    home_family_members.family_member_father_name,
    home_family_members.family_member_gender,
    home_family_members.family_member_marital_status,
    home_family_members.relation_with_family_head,
    home_family_members.family_id_number
FROM
    areas
    JOIN provinces ON provinces.id = areas.province_id
    JOIN districts ON districts.id = areas.district_id
    JOIN zones ON zones.id = areas.zone_id
    JOIN shareds ON shareds.id = areas.shared_id
    JOIN gozars ON gozars.id = areas.gozar_id
    JOIN head_of_homes ON head_of_homes.area_id = areas.id
    LEFT JOIN (
        SELECT
            serial_number AS family_member_serial_number,
            id as family_member_id,
            name AS family_member_name,
            father_name AS family_member_father_name,
            gender AS family_member_gender,
            marital_status AS family_member_marital_status,
            relation_with_family_head AS relation_with_family_head,
            identity_card_number AS family_id_number,
            head_of_family_id
        FROM
            home_family_members
        GROUP BY
            head_of_family_id,
            family_member_serial_number,
            family_member_id,
            family_member_name,
            family_member_father_name,
            family_member_gender,
            family_member_marital_status,
            relation_with_family_head,
            family_id_number
    ) AS home_family_members ON home_family_members.head_of_family_id = head_of_homes.id
    LEFT JOIN ethnicities ON ethnicities.id = head_of_homes.ethnicity
    LEFT JOIN languages ON languages.id = head_of_homes.language
    LEFT JOIN religions ON religions.id = head_of_homes.religion
GROUP BY
    head_of_homes.id,
    areas.id,
    areas.province_id,
    areas.district_id,
    areas.zone_id,
    areas.shared_id,
    areas.gozar_id,
    areas.area_information,
    areas.created_at,
    areas.remark,
    head_of_homes.name,
    head_of_homes.serial_number,
    head_of_homes.father_name,
    head_of_homes.identity_card_number,
    home_family_members.head_of_family_id,
    home_family_members.family_member_serial_number,
    home_family_members.family_member_id,
    home_family_members.family_member_name,
    home_family_members.family_member_father_name,
    home_family_members.family_member_gender,
    home_family_members.family_member_marital_status,
    home_family_members.relation_with_family_head,
    home_family_members.family_id_number,
    family_id_number,
    ethnicities_name,
    language_name,
    religion_name,
    zones.name,
    province,
    district,
    shared_name,
    gozar_name;
--End of the home table view.