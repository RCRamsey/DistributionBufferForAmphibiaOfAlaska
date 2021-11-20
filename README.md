# DistributionBufferForAmphibiaOfAlaska

## A Repo created to explore usage of node and turf.js focusing on the distribution and proposed buffer zones of Rough Skin Newt and Western Toad for Alaska and if their range is impacted by observed damage caused by Douglas-fir beetles.

## TOC
- [](#words-words)

## Data
Amphibian data originally pulled from [Alaska Center for Conservation Science University of Alaska Anchorage](http://akgap.uaa.alaska.edu/species-data/) on 2021-11-20. Downloaded zipped folders and explored the shapefile for 

- RoughskinNewt_AnnualRange (8.38 KB)
- WesternToad_AnnualRange (1.5 MB)
- WoodFrog_AnnualRange (4.7 MB)

City data originally pulled from [US Census Bureau TIGER/Line Shapefiles](https://www.census.gov/cgi-bin/geo/shapefiles/index.php) on 2021-11-20. Downloaded zipped folder for
places 2021 and explored the shapefile (4.21 MB)

Locations of damaged forests caused by insect, disease and other abiotic agents pulled from [IDS Points U.S. Forest Service](https://gis.data.alaska.gov/search?collection=Dataset&q=point) on 2021-11-20. Downloaded zipped folder for points and explored the shapefile (89.1 MB)

### Exploration
Initial Exploration of Files in command module using ogrinfo

- RoughskinNewt_AnnualRange 
    - DBF_DATE_LAST_UPDATE=2015-05-21
    - Geometry: Polygon
    - Feature Count: 9
    - PROJCRS NAD83/Alaska Albers
    - 19 attributes (HUC_CODES; SEASON; SOURCE2; KINGDOM; PHYLUM; CLASS; FAMILY; SCI_NAME; TSN; ELCODE; GRANK; SRANK; PRESENT; REPRO_US; SOURCE1; MaxYEAR; OCCURRENCE; Shape_leng; Shape_Area;). All attributes a mix of Integer, String, Real
- WesternToad_AnnualRange
    - DBF_DATE_LAST_UPDATE=2015-05-21
    - Geometry: Polygon
    - Feature Count: 17 
    - PROJCRS NAD83/Alaska Albers
    - Attributes same as RoughskinNewt_AnnualRange 
- WoodFrog_AnnualRange
    - DBF_DATE_LAST_UPDATE=2015-05-21
    - Geometry: Polygon
    - Feature Count: 108 
    - PROJCRS NAD83/Alaska Albers
    - Attribues same as RoughskinNewt_AnnualRange 
- tl_2021_02_place
    - DBF_DATE_LAST_UPDATE=2021-09-15
    - Geometry: Polygon
    - Feature Count: 355
    - PROJCRS NAD 83 (EPSG 4269)
    - 16 Attributes (STATEFP; PLACEFP; PLACENS; GEOID; NAME; NAMELSAD; LSAD; CLASSFP; PCICBSA; PCINECTA; MTFCC; FUNCSTAT; ALAND; AWATER; INTPTLAT; INTPTLON) 
- IDS Points (Insect_and_Disease_Survey.csv) 

Secondary Exploration of Files in command module using mapshaper
*insert mapshaper image here*

### Processing

#### Douglas-Fir Beetle Damage Files
Install npm packages:
- npm install @turf/turf
- npm install chalk
- npm install csvtojson
- npm install geojson-validation

Write scripts to process/filter/reduce file size of data
- process-csv-ids.js to filter out all points of IDS damage except those corresponding to Douglas Fir Beetles (47798 features filtered; resulting json file 6.3 MB)

- create-hex.js to create hexagon layer bounded over alaska (198 hexagons; 49 KB)

#### Amphibia Files
Transform shapefiles projection from NAD 83 to WGS 84 (EPSG: 4326) using ogr2ogr in command prompt.

Transform shapefiles to geojson, filter fields, reduce and simplify using mapshaper in command prompt (example):
`mapshaper RoughskinNewt4326.shp -filter-fields HUC_CODES,OCCURRENCE,SCI_NAME,SEASON, -simplify dp 30% -o format=geojson RoughskinNewt4326simpl.json`
(roughskinnewt4326simpl.json = 9.43 KB)
(westerntoad4326simpl.json = 1.7 MB)

Transform shapefiles to geojson just as above but include precision reduction
`mapshaper RoughskinNewt4326.shp -filter-fields HUC_CODES,OCCURRENCE,SCI_NAME,SEASON, -simplify dp 30% -o precision=.0001 format=geojson RoughskinNewt4326simpl_precis.json`
(roughskinnewt4326simpl_precis.json = 4.69 KB)
(westerntoad4326simpl_precis.json = 8.5 KB)

Transform shapefiles to geojson just at above but instead of geojson use topojson to further reduce file size
`mapshaper RoughskinNewt4326.shp -filter-fields HUC_CODES,OCCURRENCE,SCI_NAME,SEASON, -simplify dp 30% -o precision=.0001 format=topojson roughskinnewt4326simpl_precis_topo.json`
(roughskinnewt4326simple_precis_topo.json = 2.16 KB)
(westerntoad4326simpl_precis_topo.json = 3.75 KB)

Rough Skin Newt & Western Toad Files transformed fine.
Rough Skin Newt Initial: 1.24 MB
Rough Skin Newt Final: 2.16 KB

Western Toad Initial: 2.24 MB
Western Toad Final: 3.75 KB

Wood Frog had issues, reference wood frog error graphic to return and refine at a later date.
Will continue on with Rough Skin Newt & Western Toad files. 


