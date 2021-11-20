# DistributionBufferForAmphibiaOfAlaska

## A Repo created to explore usage of node and turf.js focusing on the distribution and proposed buffer zones of Ampibia for Alaska and if their range is impacted by observed damage caused by Douglas-fir beetles.

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


### Processing
Install npm packages:
- npm install @turf/turf
- npm install chalk
- npm install csvtojson
- npm install geojson-validation

Write scripts to process/filter/reduce file size of data
- process-csv-ids.js to filter out all points except those corresponding to Douglas Fir Beetles

